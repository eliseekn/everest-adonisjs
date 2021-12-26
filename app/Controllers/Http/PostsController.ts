import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import StorePostValidator from 'App/Validators/StorePostValidator'
import { slugify } from 'helpers'
import Application from '@ioc:Adonis/Core/Application'

export default class PostsController {
    public async index({ }: HttpContextContract) { }

    public async create({ }: HttpContextContract) { }

    public async store({ request, response, session }: HttpContextContract) {
        await request.validate(StorePostValidator)

        const { title, content } = request.only(['title', 'content'])
        const image = request.file('image')

        if (image) {
            await image.move(Application.tmpPath('uploads'))
        }

        await Post.create({
            title: title,
            slug: slugify(title),
            content: content,
            image: image?.fileName
        })

        session.flash('success', 'Post created successfully')
        response.redirect().back()
    }

    public async show({ }: HttpContextContract) { }

    public async edit({ }: HttpContextContract) { }

    public async update({ }: HttpContextContract) { }

    public async destroy({ }: HttpContextContract) { }
}
