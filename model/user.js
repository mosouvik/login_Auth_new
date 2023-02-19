const mongoose=require('mongoose');
const schema=mongoose.Schema;
const userschema=new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:true
    }
})
const usermodel=new mongoose.model('user4',userschema)
module.exports=usermodel