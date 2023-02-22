const express=require('express');
const Route=express.Router();
const controller=require('../controller/userController');
const verify=require('../middleware/verifysingup')

Route.get('/',controller.home)
Route.get('/about',controller.userAuth,controller.about)
Route.get('/product',controller.product)
Route.get('/register',controller.register)
 Route.post('/registercreate',[verify.CheckDuplicate],controller.register_create)
 Route.get('/login',controller.login)
 Route.post('/login/creat',controller.login_create)
 Route.get('/dashboard',controller.userAuth,controller.dashboard)
 Route.get('/logout',controller.logout)


module.exports=Route