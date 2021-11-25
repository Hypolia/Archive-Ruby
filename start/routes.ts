/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.group(() => {


  Route.get('/authentication/user/me', 'AuthController.user').middleware('auth')

  Route.post('/authentication/api/login', 'AuthController.loginApi')
  Route.post('/authentication/api/logout', 'AuthController.logoutApi').middleware('auth')


  Route.group(() => {

    // Route pour le model Minecraft
    Route.resource('minecraft', 'MinecraftsController').apiOnly().middleware({})
    Route.get('/minecraft/is-present/:id', 'MinecraftsController.isPresent')

    // Route pour le model User
    Route.resource('user', 'UsersController').apiOnly().middleware({})
    Route.get('/user/is-present/:id', 'UsersController.isPresent')

    // Route pour le model Discord
    Route.resource('discord', 'DiscordsController').apiOnly().middleware({})
    Route.get('/discord/is-present/:id', 'DiscordsController.isPresent')

    // Route pour le model Ticket
    Route.resource('ticket', 'TicketsController').apiOnly().middleware({})
    Route.get('ticket/is-present/:id', 'TicketsController.isPresent')

    

    // Route pour le model Role
    Route.resource('role', 'RolesController').apiOnly().middleware({})
    Route.get('role/is-present/:id', 'RolesController.isPresent')

    // Route pour le model Permission
    Route.resource('permission', 'PermissionsController').apiOnly().middleware({})
    Route.get('permission/is-present/:id', 'PermissionsController.isPresent')

    Route.group(() => {
      Route.resource('', 'ShopsController').apiOnly().middleware({})
    }).prefix('shop')
  })
    //.middleware("auth:api")
}).prefix('api')
