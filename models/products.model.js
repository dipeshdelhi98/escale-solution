const mongoose=require('mongoose');

const productsSchema=mongoose.Schema({
   name:{
        type:"String",
        required:true
    },
  mrp:{
        type:"Number",
        required:true,
   
    },
    description:{
        type:"String",
        required:true,
    },
    img:[

	{
        type:[],
		data: Buffer,
		contentType: String
	}]

});




const productsModel=mongoose.model('products',productsSchema);

module.exports=productsModel;