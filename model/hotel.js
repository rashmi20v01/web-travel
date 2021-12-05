var mongoose=require('mongoose');

const hotelschema=mongoose.Schema({
  name:{
    type:String,
    
  },

  mobile:{
    type:Number,
    unique:true
  },

  address:{
    type:String
  },

  hoteltype:{
    type:String
  },

  details:{
    type:String
  },

  food:{
    type:String
  },
  
  price:{
    type:Number
  },

  place:{
    type:String
  }
})

module.exports=mongoose.model('Hotel',hotelschema)