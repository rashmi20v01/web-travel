const express=require('express');
var messagebird=require('messagebird')('l9G6x3pvUELzZNhpEYId8EsTA')
const router=express.Router();
const Register=require('../model/sign')
const Cab=require('../model/cab')
const Hotel=require('../model/hotel')
const bcrypt=require('bcrypt')
const nodemailer=require('nodemailer')
var phone=""
var place=""

router.get('/',(req,res)=>{
  res.render("sign")
})

router.get('/contact',(req,res)=>{
  res.render("contact")
})

router.get('/cabs',(req,res)=>{
  res.render('cabs')
})

router.get('/hotel',(req,res)=>{
  res.render('hotels')
})

router.get("/login",(req,res)=>{
  res.render("login")
})

router.get("/delhi",(req,res)=>{
  res.render("delhi")
})

router.get("/singapore",(req,res)=>{
  res.render("singapore")
})

router.get("/switzerland",(req,res)=>{
  res.render("switzerland")
})

router.get("/home",(req,res)=>{
  res.render("home")
})

router.post('/login',async(req,res)=>{
  try{
    const details=await Register.findOne({email:req.body.email})
    if(details)
    res.render("sign",{
      msg:"Email already registered!"
    })
    else if(req.body.password===req.body.cpassword)
    {
      const registeruser=new Register({
        email:req.body.email,
        password:req.body.password
       })
      const e=await registeruser.save()
      res.render('login')
    }
    else{
      res.render("sign",{
        msg:"Passwords dont match!"
      })
    }
  }
  catch(error){
    console.log(error);
  }
});

router.post('/home',async(req,res)=>{
  try{
    const details=await Register.findOne({email:req.body.lemail})
    const ismatch=await bcrypt.compare(req.body.lpassword,details.password)
    if(ismatch)
    {
      phone=req.body.mobile;
      res.status(201).render("home",{
        user:req.body.lemail
      })
    }
    else{
      res.render("login",{
        msg:"Invalid login details!"
      })
    }
  }
  catch(error){
    console.log(error);
  }
})

router.post('/findcab',async(req,res)=>{
  try{
    const cabdet=await Cab.find({pickup:req.body.search.toLowerCase(),status:"free"})
    place=req.body.destination
    res.render("driver",{det:cabdet})
  }
  catch(error){
    console.log(error)
  }
})

router.get('/book/:id',async(req,res)=>{
  try{
    if(phone)
    {
  messagebird.messages.create({
    originator:'SDKDemo',
    recipients:['+917026318322'],
    body:'Booked by '+phone +"and destination is "+place
  },function(err,response){
    if(err)
    console.log(err)
    else
    console.log(response)
  });
  const c=await Cab.findByIdAndUpdate(req.params.id,{
    status:"booked"
  })
  res.render('cabs',{conf:"Booked!"})
}
else
res.redirect('/login')
}
catch(err)
{
  console.log(err);
}
})

router.post('/findhotel',async(req,res)=>{
  try{
    const hoteldet=await Hotel.find({place:req.body.search.toLowerCase()})
    res.render("resort",{det:hoteldet})
  }
  catch(error){
    console.log(error)
  }
})


router.get('/forgot-password',(req,res)=>{
  res.render("forgot")
})


router.post('/getotp',async(req,res)=>{
  try{
  otp=Math.ceil(Math.random()*1000+1)
  let transporter = nodemailer.createTransport({
    service:"hotmail",
    auth: {
      user: "rashmivasanth.191ch040@nitk.edu.in",
      pass: "####" //password for the email 
    },
  });

  let info = await transporter.sendMail({
    from: "rashmivasanth.191ch040@nitk.edu.in", // sender address
    to: req.body.newemail, // list of receivers
    subject: "otp", // Subject line
    text: otp.toString(), // plain text body
  });
  
  const k=await Register.findOneAndUpdate({email:req.body.newemail},{key:otp.toString()})
  res.render("authenticate",{k:k})
}
catch(error)
{
  console.log(error)
}
})

router.post('/authentication',async(req,res)=>{
  try{
    const r=await Register.findById(req.body.id)
    if(req.body.userotp===r.key)
    res.render("updatepass",{r:r})
    else
    res.send("Invalid otp")
  }

  catch(error)
{
  console.log(error)
}
})

router.post('/updated',async(req,res)=>{
  try{
    if(req.body.password===req.body.cpassword)
    {
      req.body.password=await bcrypt.hash(req.body.password,10)
      const w=await Register.findByIdAndUpdate(req.body.id,{
        password:req.body.password
      })
      res.render("login")
    }
    else{
      res.send("Passwords dont match!")
    }
  }
  catch(error)
  {
    console.log(error)
  }
})

module.exports=router;