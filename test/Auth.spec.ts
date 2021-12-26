import { UserFactory } from 'Database/factories'
import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Authentication', (group) => {
    group.beforeEach(async () => {
        await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
        await Database.rollbackGlobalTransaction()
    })

    test('can not login if not registered', async () => {
        const user = await UserFactory.make()

        await supertest(BASE_URL)
            .post('/login')
            .field('email', user.email)
            .field('password', user.password)
            .expect(401)
    })

    test('can login if registered', async () => {
        const user = await UserFactory.merge({ password: 'test' }).create()

        await supertest(BASE_URL)
            .post('/login')
            .field('email', user.email)
            .field('password', 'test')
            .expect(200)
    })
})
