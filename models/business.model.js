const mongoose=require('mongoose');

const businessSchema=mongoose.Schema({
    name:{
        type:"String",
        required:true
    },
  email:{
        type:"String",
        required:true,
        unique:true
      
    },
    registrationNo:{
        type:"Number",
        required:true,
   
    },

});

businessSchema.index({email:1})




const businessModel=mongoose.model('business',businessSchema);

module.exports=businessModel;