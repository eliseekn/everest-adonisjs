import Factory from '@ioc:Adonis/Lucid/Factory'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}).build()

export const PostFactory = Factory.define(Post, ({ faker }) => {
    const title: string = faker.random.words(6)

    return {
        title: title,
        slug: title,
        content: faker.random.words(15),
        image: faker.internet.avatar()
    }
}).build()

export const CommentFactory = Factory.define(Comment, ({ faker }) => {
    return {
        author: faker.internet.email(),
        content: faker.random.words(15)
    }
}).build()
