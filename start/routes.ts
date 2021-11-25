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

  /*
  |--------------------------------------------------------------------------
  | Authentication Route
  |--------------------------------------------------------------------------
  | ├── User/Me | user method
  | ├── Api/Login | loginApi method
  | ├── Api/Logout | logoutApi method
   */
  Route.get('/authentication/user/me', 'AuthController.user').middleware('auth')

  Route.post('/authentication/api/login', 'AuthController.loginApi')
  Route.post('/authentication/api/logout', 'AuthController.logoutApi').middleware('auth')


  Route.group(() => {
    /*
    |--------------------------------------------------------------------------
    | User Route
    |--------------------------------------------------------------------------
    | ├── User
    | ├── is-present | renvoie true ou false
   */
    Route.resource('user', 'UsersController').apiOnly().middleware({})
    Route.get('/user/is-present/:id', 'UsersController.isPresent')


    Route.resource('discord', 'DiscordsController').apiOnly().middleware({})
    Route.get('/discord/is-present/:id', 'DiscordsController.isPresent')

    Route.resource('minecraft', 'MinecraftsController').apiOnly().middleware({})
    Route.get('/minecraft/is-present/:id', 'MinecraftsController.isPresent')


    /*
    |--------------------------------------------------------------------------
    | Role Route
    |--------------------------------------------------------------------------
    | ├── Role
    | ├── is-present | renvoie true ou false
     */
    Route.resource('role', 'RolesController').apiOnly().middleware({})
    Route.get('role/is-present/:id', 'RolesController.isPresent')

    /*
    |--------------------------------------------------------------------------
    | Permission Route
    |--------------------------------------------------------------------------
    | ├── Permission
    | ├── is-present | renvoie true ou false
     */
    Route.resource('permission', 'PermissionsController').apiOnly().middleware({})
    Route.get('permission/is-present/:id', 'PermissionsController.isPresent')

    Route.resource('ticket', 'TicketsController').apiOnly().middleware({})
    Route.get('ticket/is-present/:id', 'TicketsController.isPresent')
  })
    //.middleware("auth:api")




}).prefix('api')
