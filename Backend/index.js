const express=require("express")
const cors=require("cors")
require("dotenv").config()
const connection = require("./config/db")
const userRouter = require("./routes/user.routes")
const productRouter = require("./routes/product.routes")


const app=express()


app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/products",productRouter)
app.get("/",(req,res)=>{
    res.send("<h1>App is RUnning </h1>")
})


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to the server")
        console.log(`server is running at :-${process.env.PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})