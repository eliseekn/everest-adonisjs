import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
    public async run() {
        await UserFactory.merge([
            {
                email: 'admin@mail.com',
                password: 'admin',
                role: 'admin'
            },

            {
                email: 'user@mail.com',
                password: 'user',
            }
        ]).createMany(2)
    }
}
