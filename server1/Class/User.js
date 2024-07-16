const UserModel=require("../models/UserModel")

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

class User{


 constructor(fullname,username,gender,password,address,cart){
       this.fullname=fullname
       this.username=username 
       this.gender=gender 
       this.password=password 
       this.address=address 
       this.cart=cart
 }


 static async register(fullname,username,gender,password,address,cart){
    try {
        const user=await UserModel.findOne({username})

        if(user && user.fullname){
            throw new  Error("UserName Already Exists")
        }
        
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newuser=new UserModel({fullname,username,gender,password:hashedPassword,address,cart})
      
        
        
        if(newuser){
            await  newuser.save()
            const jwttoken = jwt.sign({ username: newuser.username, id: newuser._id },"MERN",{ expiresIn: "1h" });
            return{
                _id:newuser.id,
                fullname:newuser.fullname,
                username:newuser.username,
                gender:newuser.gender,
                password:newuser.password,
                address:newuser.address,
                cart:newuser.cart,
                token:jwttoken
            }
        }
        else{
            throw new Error("Invalid UserData")
        }

    } catch (error) {
        console.log("e")
        throw new Error(`Registration Failed ${error.message}`)
    }
    
 }

static async login(username,password){
    
    try {

        const user=await UserModel.findOne({username})

        if(!user){
            throw new Error("Invalid username or password")
        }

        const validity = await bcrypt.compare(password, user.password);
        if(!validity){
            throw new Error("Invalid password");
        }

        
        const jwttoken = jwt.sign({ username: user.username, id: user._id },"MERN",{ expiresIn: "1h" });
       
        return{
                _id:user.id,
                fullname:user.fullname,
                username:user.username,
                gender:user.gender,
                password:user.password,
                address:user.address,
                cart:user.cart,
                token:jwttoken
        }

        
    } catch (error) {
        throw new Error("Internal Server Error");
    }
}

static async updateProfile(userId, newData) {
    try {
    // Update user profile
    const updatedUser = await UserModel.findByIdAndUpdate(userId, newData, { new: true });
    if (!updatedUser) {
        throw new Error('User not found');
    }
    return updatedUser;
    } catch (error) {
    throw new Error(`Profile update failed: ${error.message}`);
    }
}


static async addToCart(userId, productId) {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.cart.push(productId);
        await user.save();
        return user;
    } catch (error) {
        throw new Error(`Add to cart failed: ${error.message}`);
    }
}

static async removeToCart(userId, productId) {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.cart = user.cart.filter(item => item.toString() !== productId.toString());
        await user.save();
        return user;
    } catch (error) {
        throw new Error(`Remove from cart failed: ${error.message}`);
    }
}

}



module.exports={User}