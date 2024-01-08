// const { default: mongoose } = require("mongoose");

const mongoose=require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const DataSchema=mongoose.Schema({
    product: {type:String,required:true},
    quantity: {type:Number,required:true},
    price: {type:Number,required:true},
    },
    {timestamps:true,versionKey:false}
    
    )
    const saleModel=mongoose.model('sales',DataSchema)
module.exports=saleModel