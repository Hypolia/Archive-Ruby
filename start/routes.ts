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
  | User Route
  |--------------------------------------------------------------------------
  | ├── User
   */
  Route.resource('user', 'UsersController').apiOnly().middleware({})
  Route.post('/user/compute-if-absent/:id', 'UsersController.computeIfAbsent')


  /*
  |--------------------------------------------------------------------------
  | Discord Route
  |--------------------------------------------------------------------------
  | ├── Discord
   */
  Route.resource('discord', 'DiscordsController').apiOnly().middleware({})
  Route.post('/discord/compute-if-absent/:id', 'DiscordsController.computeIfAbsent')


  /*
  |--------------------------------------------------------------------------
  | Minecraft Route
  |--------------------------------------------------------------------------
  | ├── Minecraft
  | ├── Minecraft/is-present | Return @true or @false si l'user est créé
  | ├── Permission
  | ├── Stat
   */
  Route.resource('minecraft', 'MinecraftsController').apiOnly().middleware({})
  Route.get('/minecraft/is-present/:id', 'MinecraftsController.isPresent')




  Route.get('/authentication/user/me', 'AuthController.user').middleware('auth')

  Route.post('/authentication/api/login', 'AuthController.loginApi')
  Route.post('/authentication/api/logout', 'AuthController.logoutApi').middleware('auth')
}).prefix('api')
