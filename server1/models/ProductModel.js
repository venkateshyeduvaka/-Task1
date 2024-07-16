const mongoose=require("mongoose")

const {Schema}=mongoose

const ProductSchema=mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    productname:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    
    userid:{ type: mongoose.Schema.Types.ObjectId, ref: 'Profiles' }
},
{timestamps: true}
)

const ProductModel=mongoose.model("Products",ProductSchema)

module.exports=ProductModel