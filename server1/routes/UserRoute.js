const express=require("express")

const {registeruser,loginuser,addCartItem,RemoveCartItem}=require("../controllers/UserController")

const router=express.Router()

router.post("/register",registeruser)
router.post("/login",loginuser)
router.put("/addcart/:id",addCartItem) 
router.put("/removecart/:id",RemoveCartItem) 

module.exports=router