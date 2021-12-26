import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

export default class AuthController {
    public async login({ request, response, auth, session }: HttpContextContract) {
        await request.validate(LoginValidator)

        const { email, password } = request.only(['email', 'password'])

        try {
            await auth.use('web').attempt(email, password)
            session.flash('success', `Welcome ${email}`)

            //response.redirect('/dashboard')
            response.send('okkkkkkkkkkkkkkkkk')
        } catch {
            session.flash('success', 'Invalid credentials')
            response.status(401).redirect().back()
        }
    }
}
