const mongoose=require("mongoose")

const {Schema}=mongoose



const UserSchema=mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        required: true  
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        
        
    },
    cart:[{type:mongoose.Schema.Types.ObjectId,ref:"Products"}]
},

{timestamps: true}
)

const UserModel=mongoose.model("Profiles",UserSchema)

module.exports=UserModel