var express=require('express')
const app=express()
const path=require('path')
var mongoose=require('mongoose')
const router=require('./router')

app.use(express.static(path.join(__dirname,'../public')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.set('views','../views')
app.set('view engine','hbs')

app.use('/',router)

const url='mongodb://localhost/lavoyage'
mongoose.connect(url,{useNewURLParser:true})
const con=mongoose.connection

app.listen(8010)


