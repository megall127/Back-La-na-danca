import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  static merge(arg0: { pesinhos_month: number }) {
      throw new Error('Method not implemented.')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public name: string

  @column()
  public tell: string

  @column()
  public pesinhos_month: number

  @column()
  public pesinhos_years: number

  @column()
  public avulso: number

  @column()
  public subs: number

  @column()
  public subsprof: number

  @column()
  public eventos: number

  @column()
  public fiscal: number

  @column()
  public typeuser: string

  @column()
  public elogio: number

  @column()
  public critica: number

  @column()
  public falta: number

  @column()
  public tempodecasa: number

  @column()
  public turmafiscal: string

  @column()
  public turmafixas: number

  @column()
  public active: boolean

  

  @column()
  public rememberMeToken?: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime


  @beforeSave()
  public static async hashPassword (User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }
}
