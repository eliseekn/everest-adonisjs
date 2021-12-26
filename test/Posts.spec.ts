import Database from '@ioc:Adonis/Lucid/Database'
import Post from 'App/Models/Post'
import { PostFactory, UserFactory } from 'Database/factories'
import test from 'japa'
import supertest from 'supertest'
import { slugify } from '../helpers'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Posts', (group) => {
    group.before(async () => {
        const user = await UserFactory.merge({ password: 'test' }).create()

        await supertest(BASE_URL)
            .post('/login')
            .field('email', user.email)
            .field('password', 'test')
            .expect(200)
            .then(res => console.log(res.text))
        
    })

    group.beforeEach(async () => {
        await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
        await Database.rollbackGlobalTransaction()
    })

    test('can not store if not authenticated', async () => {
        const post = await PostFactory.make()

        await supertest(BASE_URL)
            .post('/posts')
            .field('title', post.title)
            .field('content', post.content)
            .attach('image', __dirname + '/assets/img/post-image.svg')
            .expect(302)
    })

    test.only('can store if authenticated', async (assert) => {
        const post = await PostFactory.make()

        await supertest(BASE_URL)
            .post('/posts')
            .field('title', post.title)
            .field('content', post.content)
            .attach('image', __dirname + '/assets/img/post-image.svg')
            .expect(200)

        const _post = await Post.findBy('slug', slugify(post.title))

        assert.exists(_post)
    })
})
