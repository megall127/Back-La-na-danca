import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'

export default class ClassesController {

    public async create( {request, response}: HttpContextContract) {

        const classes = new Class()

        classes.name = request.input('name')
        classes.room = request.input('room')
        classes.start = request.input('start')
        classes.end = request.input('end')


        await classes.save()
    }

    public async getClasses( { auth , request, response}: HttpContextContract){  
        const check = await auth.use('api').authenticate()
    

        if(check){
            
             return await Class.all();
        } else {
            
            return "Usuario nao autenticado"
        }      
    }



}