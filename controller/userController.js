const User=require('../model/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

userAuth=(req,res,next)=>{
    if (req.user) {
        console.log(req.user);
        next();
        
    } else {
        console.log(req.user);
        req.flash('message2', "Can NOT access this page.....");
        res.redirect('/login')

    }
}

const home=(req,res)=>{

    res.render('home',{
         data:req.user,
       
    })
}

const about=(req,res)=>{
    res.render('About',{
        data:req.user,
    })     

}

const dashboard=(req,res)=>{
    res.render('dashboard',{
        data:req.user,
    })     

}
const product=(req,res)=>{
    res.render('Product',{
        data:req.user,
    })     

}

const register=(req,res)=>{
    res.render('register',{
        message2: req.flash('message2'),
        data:req.user,
        // data:User.find()

    })
}

const register_create=(req,res)=>{
    User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    }).save((err,data)=>{
        if (!err) {
            req.flash('message',"User Added")
            res.redirect('/login')
            
        }else{
            console.log(err,"User NOT Added");
        }
    })
}

const login=(req,res)=>{
   
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('login',{
        message: req.flash('message'),
        message2: req.flash('message2'),
        data1:loginData,
        data:req.user,
    })
}


const login_create=(req,res)=>{
    User.findOne({
        email: req.body.email
    }, (err, data) => {
       
        if (data) {
            console.log(data);
            const haspassword = data.password;
            if (bcrypt.compareSync(req.body.password, haspassword)) {
                const token = jwt.sign({
                    id: data._id,
                    name: data.name
                }, "souvik12345@678", { expiresIn: '5m' })
                res.cookie("userToken", token)
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log(data)
                res.redirect('/dashboard')    
            } else {
                req.flash('message2', "Password Incorrect");
                res.redirect('/login')
            }
        } else {
            req.flash('message2', "No User found with thet email");
            res.redirect('/login')
        }
       
    })
}

 

const logout=(req,res)=>{
    res.clearCookie("userToken");
    res.redirect('/login')
}


module.exports={
 register,
 register_create,
 login,
 login_create,
 dashboard,
 userAuth,
 logout,
home,
about,
product,

}