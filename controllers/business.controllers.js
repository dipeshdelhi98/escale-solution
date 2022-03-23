const Business=require('../models/business.model');


module.exports={

    create:async (req,res)=>{
     

        const {name,email,registrationNo}=req.body

        console.log(req.body)

        try {

            let checkBusiness=await Business.findOne({email:email});
            if(checkBusiness){
                return res.json({
                    message:"Email Already Exist"
                })
            }

            const business=await Business.create({
               name:name,
               email:email,
               registrationNo:registrationNo

            }).then((data)=>{
                console.log(data)
             return res.json({
                 status:"Success",
                 message:"Business Succesfully Created",
                 
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

        console.log("Inside findAll");
    
        Business.find({}).then((data)=>{
            // console.log(data)

         return res.send(data)
        }).catch((error)=>{
            console.log(error)
            res.status(400).send({message:"Something Went Wrong"})
        });
        
    },

}