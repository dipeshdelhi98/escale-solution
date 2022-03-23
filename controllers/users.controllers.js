const Users=require('../models/users.model')


module.exports={

    create:async (req,res)=>{

        var obj = {
            name: req.body.name,
            email: req.body.email,
            bio:req.body.bio,
            profilePic: req.file.path
        }

  

        try {

            let user=await Users.findOne({email:obj.email});
            if(user){
                return res.json({
                    message:"User already Exist"
                })
            }



        const users=await Users.create({ 
            name:obj.name,
            email:obj.email,
            bio:obj.bio,
            profilePic:obj.profilePic
        }).then((data)=>{
                console.log(data)
             return res.json({
                 status:"Success",
                 message:"User Succesfully Created",
              
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
        Users.find({}).then((data)=>{
            // console.log(data)

         return res.send(data)
        }).catch((error)=>{
            console.log(error)
            res.status(400).send({message:"Something Went Wrong"})
        });
        
    },




}