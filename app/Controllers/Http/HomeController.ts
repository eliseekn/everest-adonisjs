import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'
import Post from 'App/Models/Post'

export default class HomeController {
    public async index(ctx: HttpContextContract) {
        const view = await View.render('home', {
            posts: Post.all()
        })

        ctx.response.send(view)
    }
}
