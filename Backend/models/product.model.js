const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    price:Number,
    description:String,
    category:String,
    isInCart:{
        type:Boolean,
        default:false
    }
})

const ProductModel=mongoose.model("product",productSchema)

module.exports=ProductModel