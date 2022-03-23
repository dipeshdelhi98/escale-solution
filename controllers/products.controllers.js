const Products=require('../models/products.model');
const mongoose=require('mongoose')


module.exports={

    create:async (req,res)=>{
        

        console.log("#######",req.files)
        const files=req.files
        let urls=[];
        urls=req.files.map((e)=>e.path)
        var obj = {
            name: req.body.name,
            mrp: req.body.mrp,
            description:req.body.description,
            img:urls
        }

  

        try {
        const products=await Products.create({ 
            name:obj.name,
            mrp:obj.mrp,
            description:obj.description,
            img:obj.img
        }).then((data)=>{
                console.log(data)
             return res.json({
                 status:"Success",
                 message:"Product Succesfully Created",
              
             })
            }).catch((error)=>{
                console.log(error)
                res.status(400).send({message:"Something Went Wrong"})
            });
            
        } catch (error) {
            console.log(error)
            return res.json({
                status:"Error",
                message:"Something Went Wrong",
                data:{}

            })
            
        }
    },


    findAll:async(req,res)=>{
        Products.find({}).then((data)=>{
            // console.log(data)

         return res.send(data)
        }).catch((error)=>{
            console.log(error)
            res.status(400).send({message:"Something Went Wrong"})
        });
        
    },


    updateById:async(req,res)=>{

        console.log("req params==>",req.body)
  

        const id = mongoose.Types.ObjectId(req.params.id.trim());

        console.log(id)

        Products.findByIdAndUpdate(id,req.body).then((data)=>{
            return res.send({message:"Successfully Updated"})

        //  return res.send(data)
        }).catch((error)=>{
            console.log(error)
            res.status(400).send({message:"Something Went Wrong"})
        });


    },

    deleteById:async(req,res)=>{

        console.log("req params==>",req.params)
        console.log("req.body ",req.body);

        const id = mongoose.Types.ObjectId(req.params.id.trim());

        console.log(id)

        Products.findByIdAndRemove(id).then((data)=>{
            return res.send({message:"Successfully Deleted"})

        //  return res.send(data)
        }).catch((error)=>{
            console.log(error)
            res.status(400).send({message:"Something Went Wrong"})
        });


    },

}