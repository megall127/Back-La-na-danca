import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'


export default class UsersController {



    public async create({ request, response }: HttpContextContract) {
        const user = new User()

        user.email = request.input('email')
        user.password = request.input('password')
        user.name = request.input('name')
        user.tell = request.input('tell')
        user.pesinhos_month = request.input('pesinhos_month')
        user.pesinhos_years = request.input('pesinhos_years')
        user.avulso = request.input('avulso')
        user.subs = request.input('subs')
        user.subsprof = request.input('subsprof')
        user.eventos = request.input('eventos')
        user.fiscal = request.input('fiscal')
        user.typeuser = request.input('typeuser')
        user.elogio = request.input('elogio')
        user.critica = request.input('critica')
        user.falta = request.input('falta')
        user.tempodecasa = request.input('tempodecasa')
        user.turmafiscal = request.input('turmafiscal')
        user.turmafixas = request.input('turmafixas')
        user.active = request.input('active')

        await user.save()
    }



    public async login({ auth, request, response }: HttpContextContract) {

        const email = request.input('email')
        const password = request.input('password')


        try {
            const token = await auth.use('api').attempt(email, password)
            return {
                token: token,
                user: auth.user,
            }
        } catch {
            return response.unauthorized('Invalid credentials')
        }
    }


    public async takeDados({ auth, request, response }: HttpContextContract) {

        const check = await auth.use('api').authenticate()


        if (check) {
            return auth.user
        } else {
            return "Usuário não autenticado."
        }
    }


    public async getMonitor({ auth, request, response }: HttpContextContract) {
        const check = await auth.use('api').authenticate()

        let monitores: any = []

        if (check) {
            (await User.all()).map((itens) => {
                if (itens.typeuser === "monitor") {
                    monitores.push(itens)
                } else {

                }
            })

            return monitores

        } else {
            return "Usuário não autenticado."
        }
    }

    public async getProfessor({ auth, request, response }: HttpContextContract) {
        const check = await auth.use('api').authenticate()

        let monitores: any = []

        if (check) {
            (await User.all()).map((itens) => {
                if (itens.typeuser === "professor") {
                    monitores.push(itens)
                } else {

                }
            })

            return monitores

        } else {
            return "Usuário não autenticado."
        }
    }

    public async editPesinho({ auth, request, response }) {

        const user = await User.findOrFail(request.input("id"))
        const check = await auth.use('api').authenticate();

        const newPesinhos = request.input("newPesinhos")
        const newPesinhosYears = request.input("newPesinhosYears")
        const newAvulso = request.input("newAvulso")
        const newSubs = request.input("newSubs")


        const checkValue = (newValue: number, value: number) => {
            if (newValue === null) {
                return value
            } else {
                return newValue
            }
        }

        if (check) {
            user.pesinhos_month = checkValue(newPesinhos, user.pesinhos_month);
            user.pesinhos_years = checkValue(newPesinhosYears, user.pesinhos_years);
            user.avulso = checkValue(newAvulso, user.avulso);
            user.subs = checkValue(newSubs, user.subs);

            await user?.save()

            return {
                message: "Editado com Sucesso!",
            }
        } else {
            return {
                message: "Falhou"
            }
        }
    }

    public async editValidadeProf({ auth, request, response }) {

        const user = await User.findOrFail(request.input("id"))
        const check = await auth.use('api').authenticate();

        const validade = request.input("validade")


        const checkValue = (newValue: any, value: any) => {
            if (newValue === null) {
                return value
            } else {
                return newValue
            }
        }

        try {
            await check
            user.active = checkValue(validade, user.active);
            await user?.save()

            return {
                message: "Editado com Sucesso!",
            }
        } catch (error) {
            return {
                message: "Falhou"
            }
        }
    }


    public async countPezinhos({ auth, request }: HttpContextContract) {
        const check = await auth.use('api').authenticate();

        const count = async () => {


        }



    }

    public async closeMonth({ auth, request }: HttpContextContract) {
        const check = await auth.use('api').authenticate();

        const countMonth = async () => {
            const users = await User.query().where('typeuser', 'monitor');
            try {
                for (const user of users) {
                    const totalPoints = user.avulso;
    
                    if (totalPoints % 8 === 0) {
                        const addPezinhosMonth = Math.floor(totalPoints / 8);
                        await User.query().where('id', user.id).update({ pesinhos_month: user.pesinhos_month + addPezinhosMonth });
                        console.log(addPezinhosMonth)
                    }
                }
                // for (const user of users) {
    
                //     if (user.subs >= 1) {
                //         await User.query().where('id', user.id).update({ pesinhos_month: user.pesinhos_month +  user.subs * 0.5 });
                //     }
                // }

            } catch (error) {
                return 'deu ruim'
            }
  
   
        };



        const count = async () => {
            (await User.query().where('typeuser', 'monitor')).map(async (itens: any) => {
                if (itens.pesinhos_month > itens.pesinhos_years) {
                    await User.query().where('id', itens.id).update({ pesinhos_years: itens.pesinhos_years + 1, pesinhos_month: 0, avulso: 0, subs: 0, subsprof: 0, falta: 0, fiscal: 0, elogio: 0, critica: 0 })
                } else if (itens.pesinhos_month < itens.pesinhos_years) {
                    await User.query().where('id', itens.id).update({ pesinhos_years: itens.pesinhos_years - 1, pesinhos_month: 0, avulso: 0, subs: 0, subsprof: 0, falta: 0, fiscal: 0, elogio: 0, critica: 0 })
                } else {
                    await User.query().where('id', itens.id).update({ pesinhos_years: itens.pesinhos_years, pesinhos_month: 0, avulso: 0, subs: 0, subsprof: 0, falta: 0, fiscal: 0, elogio: 0, critica: 0 })
                }
            })
        }


        if (check) {
            await countMonth();
            // await count();
        } else {
            return "Não deu bom"
        }
    }


}
