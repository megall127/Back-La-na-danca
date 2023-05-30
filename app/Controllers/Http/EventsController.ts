import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Event from "App/Models/Event"

export default class EventsController {

    public async create( {request, response}: HttpContextContract) {

        const event = new Event()

        event.class = request.input('class')
        event.monitor = request.input('monitor')

        await event.save()
    }

    public async takeDadosEvents( { auth , request, response}: HttpContextContract){  
        
        const check = await auth.use('api').authenticate()

        const monitor= request.input("monitor")

        if(check){
            return Event.query().where("monitor" , monitor)
        } else {
            return "Usuário não autenticado."
        }      
    }
    
}
