import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class HomeController {
    public async index({ view }: HttpContextContract) {
        return view.render('home', {
            posts: Post.query().orderBy('created_at', 'desc')
        })
    }
}
