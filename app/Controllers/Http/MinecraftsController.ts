// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Minecraft from "App/Models/Minecraft"
import StoreValidator from "App/Validators/minecraft/StoreValidator"
import UpdateValidator from "App/Validators/minecraft/UpdateValidator"

export default class MinecraftsController {

    public async index () {
        return Minecraft.query()
        .preload('user', (query) => query.preload('discord'))
        .preload('jobs')
        .preload('stats')
        .preload('roles', (query) => query.preload('permissions'))
        .preload('permissions')
    }

    public async show ({ params }: HttpContextContract) {
        return Minecraft.query()
        .where('uuid', params.id)
        .preload('user', (query) => query.preload('discord'))
        .preload('jobs')
        .preload('stats')
        .preload('roles', (query) => query.preload('permissions'))
        .preload('permissions')
    }

    public async isPresent ({ params }: HttpContextContract) {
        const minecraft = await Minecraft.findBy('uuid', params.id)
        return !!minecraft
    }

    public async store ({ request }: HttpContextContract) {
        const data = await request.validate(StoreValidator)
        const minecraft = await Minecraft.create(data)
        await minecraft?.related('jobs').create({
            "minecraftId": minecraft.id,
        })
        await minecraft.related('stats').create({
            "minecraftId": minecraft.id,
        })

        return { minecraft }
    }

    public async update ({ request, params }: HttpContextContract) {
        const minecraft = await Minecraft.findBy('uuid', params.id)
        const data = await request.validate(UpdateValidator)
        await minecraft?.merge(data).save()

        if (data.permissions) {
            await minecraft?.related('permissions').sync(data.permissions)
        }
        if (data.roles) {
            await minecraft?.related('roles').sync(data.roles)
        }
        if (data.user) {
            await minecraft?.related('user').create({
                minecraftId: minecraft.id,
                password: data.user.password,
                email: data.user.email,
                username: data.user.username
            })
        }

        return { minecraft }
    }

    public async destroy () {

    }
}
