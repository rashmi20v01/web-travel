var mongoose=require('mongoose');

const cabschema=mongoose.Schema({
  name:{
    type:String,
  },

  mobile:{
    type:Number,
    unique:true
  },

  pickup:{
    type:String
  },
  
  cabname:{
    type:String,
  },

  gas:{
    type:String
  },

  seater:{
    type:Number
  },

  details:{
    type:String
  },

  price:{
    type:Number
  },

  status:{
    type:String
  }
})
module.exports=mongoose.model('Cab',cabschema)