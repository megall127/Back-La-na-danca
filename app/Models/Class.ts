import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public room: number

  @column()
  public all_day: boolean

  @column()
  public start: DateTime

  @column()
  public end: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
