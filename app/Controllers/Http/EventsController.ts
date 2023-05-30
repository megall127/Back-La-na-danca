import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Event from "App/Models/Event"

export default class EventsController {

    public async create( {request, response}: HttpContextContract) {

        const event = new Event()

        event.class = request.input('name')
        event.monitor = request.input('room')

        await event.save()
    }

    public async takeDadosEvents( { auth , request, response}: HttpContextContract){  
        
        const check = await auth.use('api').authenticate()

        const id= request.input("id")

        if(check){
            return Event.query().where("id" , id)
        } else {
            return "Usuário não autenticado."
        }      
    }
    
}
