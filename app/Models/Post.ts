import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'
import User from './User'

export default class Post extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public title: string

    @column()
    public slug: string

    @column()
    public image: string

    @column()
    public content: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @hasMany(() => Comment)
    public comments: HasMany<typeof Comment>

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
