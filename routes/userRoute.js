const express=require('express');
const Route=express.Router();
const controller=require('../controller/userController');
const verify=require('../middleware/verifysingup')

Route.get('/',controller.register)
Route.post('/register',[verify.CheckDuplicate],controller.register_create)
Route.get('/login',controller.login)
Route.post('/login/creat',controller.login_create)
Route.get('/dashboard',controller.userAuth,controller.dashboard)
Route.get('/logout',controller.logout)
Route.get('/home',controller.home)

module.exports=Route