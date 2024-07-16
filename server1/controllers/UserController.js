


const {User}=require("../Class/User")

const registeruser=async function(req,res){
    try {
        const { fullname,username,gender,password,address,cart } = req.body;
        const response = await User.register(fullname,username,gender,password,address,cart); 
        res.status(200).json({ 
            msg: 'User registation successfully',
            jwtToken: response.token,
            user:{
                _id:response.id,
                fullname:response.fullname,
                username:response.username,
                gender:response.gender,
                address:response.address,
                cart:response.cart
            }
        });
    } catch (error) {
        console.log("Error in register data enter by the user:", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }

}

const loginuser = async function(req, res){
    try {
        const { username, password } = req.body;
        const response = await User.login(username, password); 
        const {_id,fullname,cart,token} = response

        res.status(200).json({ 
            msg: 'User logged in successfully',
            jwtToken: token,
            user: {
                _id,
                username: response.username,
                fullname,
                cart
            }
        });
    } catch (error) {
        console.log("Error in login credenticals:", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const addCartItem = async function(req, res){
    try {
        const userId = req.params.id
        const{productId}=req.body
        //console.log("productid--->",productId)
        const response = await User.addToCart(userId, productId);
        //console.log(response)
        const {_id,username,fullname,cart} = response 

        res.status(200).json({ 
            msg: 'User updated successfully',
            user: {
                _id,
                username,
                fullname,
                cart 
            }
        });
    } catch (error) {
        console.log("Error in update  ADD CART:", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const RemoveCartItem = async function(req, res){
    try {
        const userId = req.params.id
        const{productId}=req.body
        const response = await User.removeToCart(userId, productId);
        const {_id,username,fullname,cart} = response 
        res.status(200).json({ 
            msg: 'User updated successfully',
            user: {
                _id,
                username,
                fullname,
                cart 
            }
        });
    } catch (error) {
        console.log("Error in updateProfile:", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports={registeruser,loginuser,addCartItem,RemoveCartItem}