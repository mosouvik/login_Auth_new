const express=require('express');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const cookieparser=require('cookie-parser');
const userauth=require('./middleware/userAuth')

const app=express();

const port=process.env.PORT || 300


app.use(express.urlencoded({extended:true}));

app.use(flash());

app.use(cookieparser());

app.use(session({
    cookie:{maxAge:50000},
    secret:'souvik',
    resave:false,
    saveUninitialized:false
}))

app.set('view engine','ejs');
app.set('views','views');
app.use(userauth.authjwt)

const UserRoute=require('./routes/userRoute')
app.use(UserRoute);




const DBcon="mongodb+srv://nodeClassjan:BrnrXRpwEfvb35kG@cluster0.4axmojt.mongodb.net/gitAuthor";
mongoose.connect(DBcon,({useNewUrlParser:true,useUnifiedTopology:true}))
.then(re=>{
    app.listen(port,()=>{
        console.log("DB Connected.......");
        console.log(`server running http://localhost:${port}`);
    })
}).catch(err=>{
    console.log(err);
})