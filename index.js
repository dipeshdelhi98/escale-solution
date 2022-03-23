const express=require('express');
const app=express();
const PORT=8080;
const mongoose=require('mongoose');
const URL=`mongodb+srv://root:root@cluster0.9gwkj.mongodb.net/escaleDb?retryWrites=true&w=majority`;
const usersRoutes=require('./routes/users.routes')
const businessRoutes=require('./routes/business.routes')
const productsRoutes=require('./routes/products.routes')
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.json());



mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },()=>{
    console.log("Database connected Successfully")
})



app.use('/users',usersRoutes)
app.use('/business',businessRoutes)
app.use('/products',productsRoutes)



app.get('/',(req,res)=>{
    res.send({message:"Express "})
})

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})