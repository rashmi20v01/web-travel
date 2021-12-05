var mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const registerschema=mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true
  },
  key:{
    type:String
  }

})

registerschema.pre("save",async function(next){
  this.password=await bcrypt.hash(this.password,10)
  next()
})

module.exports=mongoose.model('Register',registerschema)