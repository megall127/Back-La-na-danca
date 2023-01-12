import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'


export default class UsersController {



    public async create( {request, response}: HttpContextContract) {

        const user = new User()

        user.email = request.input('email')
        user.password = request.input('password')
        user.name = request.input('name')
        user.tell = request.input('tell')
        user.pesinhos_month = request.input('month')
        user.pesinhos_years = request.input('years')
        user.avulso = request.input('avulso')
        user.subs = request.input('subs')
        user.typeuser = request.input('typeuser')

        await user.save()
    }

    public async login({auth, request, response}:HttpContextContract) {

        const email = request.input('email')
        const password = request.input('password')
        
        
        try {
        const token = await auth.use('api').attempt(email, password)
          return {
            token: token,
            user: auth.user
          }
        } catch {
          return response.unauthorized('Invalid credentials')
        }
    }


    public async takeDados( { auth , request, response}: HttpContextContract){  
        
        const check = await auth.use('api').authenticate()

        
        if(check){
            return auth.user
        } else {
            return "Usuário não autenticado."
        }      
    }


    public async getMonitor( { auth , request, response}: HttpContextContract){  
        const check = await auth.use('api').authenticate()
        
        let monitores:any = []

        if(check){
            (await User.all()).map((itens) => {
                if(itens.typeuser === "monitor"){
                    monitores.push(itens)
                } else {

                }
            })

            return monitores

        } else {
            return "Usuário não autenticado."
        }      
    }

    public async editPesinho( {auth, request, response }){

        const user = await User.findOrFail(request.input("id"))

        const newPesinhos= request.input("newPesinhos")
        const newPesinhosYears = request.input("newPesinhosYears")
        const newAvulso = request.input("newAvulso")
        const newSubs = request.input("newSubs")


        const checkValue = (newValue: number, value: number) => {
            if(newValue === null){
                return value
            } else {
                return newValue
            }
        } 

        try {   
            await auth.check()
            user.pesinhos_month = checkValue(newPesinhos, user.pesinhos_month);  
            user.pesinhos_years = checkValue(newPesinhosYears, user.pesinhos_years);  
            user.avulso = checkValue(newAvulso, user.avulso);  
            user.subs = checkValue(newSubs, user.subs);  

            await user?.save()

            return{
                message: "Editado com Sucesso!",
            }
        } catch (error) {
            return{
                message: "Falhou"
            }
        }
    }

    public async closeMonth({auth,request}:HttpContextContract){
        const check = await auth.use('api').authenticate();

        const count = async () => {
            (await User.query().where('typeuser' , 'monitor')).map(async (itens:any) => {
                if(itens.pesinhos_month > itens.pesinhos_years){
                    await User.query().where('id', itens.id).update({pesinhos_years: itens.pesinhos_years + 1, pesinhos_month: 0, avulso: 0, subs: 0})
                } else if(itens.pesinhos_month < itens.pesinhos_years){
                    await User.query().where('id', itens.id).update({pesinhos_years: itens.pesinhos_years - 1, pesinhos_month: 0, avulso: 0, subs: 0})
                } else {
                    await User.query().where('id', itens.id).update({pesinhos_years: itens.pesinhos_years, pesinhos_month: 0,  avulso: 0, subs: 0})
                }
            })
        }

        if(check){
            count()
        } else {
            return "Não deu bom"
        }
    }


}
