const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const seedDB = require('./seed')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

// Routing Constant
const blogRoutes = require('./routes/blog')

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'/public')))
app.use(methodOverride('_method'))

// Session Related (Formed for using connect-flash)
const sessionConfig = {
    secret:'this is a good secret',
    saveUninitialized: true,
    resave: false
}

app.use(session(sessionConfig))
app.use(flash())
// For global message without including message as object in all the cases
app.use((req,res,next)=>{
    res.locals.msg = req.flash('success')
    res.locals.errMsg = req.flash('error')
    next()
})

mongoose.connect('mongodb://localhost:27017/blogApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('DB Connected')
    })
    .catch((err)=>{
        console.log("DB not COnnected")
        console.log(err)
    })

// Seeding DB
// seedDB()



//Getting the Blog Routes
app.use(blogRoutes)


app.listen(3000,()=>{
    console.log('Starting the Server on Port 3000')
})