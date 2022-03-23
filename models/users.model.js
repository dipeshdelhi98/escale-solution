const mongoose=require('mongoose');

const usersSchema=mongoose.Schema({
   name:{
        type:"String",
        required:true
    },
  email:{
        type:"String",
        required:true,
        unique:true
   
    },
    bio:{
        type:"String",
        required:true,
    },
    profilePic:

	{   
        type:"String",
		data: Buffer,
		contentType: String
	}

});




const usersModel=mongoose.model('users',usersSchema);

module.exports=usersModel;