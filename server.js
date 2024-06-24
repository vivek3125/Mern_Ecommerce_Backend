import express from 'express'
import mongoose from 'mongoose';
import userRouter from './Routes/user.js'
import bodyParser from 'express'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import cors from 'cors'
import paymentRouter from './Routes/payment.js'
const app =express();


app.use(bodyParser.json());

app.use(cors({
     origin:true,
     methods:["GET","POST","PUT","DELETE"],
     credentials:true
}))

// home testing route
app.get('/',(req,res)=>res.json({messge:'This is home route'}))

// user Router
app.use('/api/user',userRouter)

// product Router
app.use('/api/product',productRouter)

// cart Router
app.use('/api/cart',cartRouter)

// address Router
app.use('/api/address',addressRouter)

// payment Router
app.use('/api/payment',paymentRouter)

mongoose.connect("mongodb://localhost:27017/Ecommerce",{dbName:"Ecommerce"}).then(()=>{
     console.log("Mongodb sussfully connented...")
}).catch((error)=>{console.log(error)});
const port=1000
app.listen(port,()=>console.log(`server is Running ${port} port`))