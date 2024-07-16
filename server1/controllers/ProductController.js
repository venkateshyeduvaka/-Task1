const {Product}=require("../Class/Product");
const ProductModel = require("../models/ProductModel");

const checking=async function(req,res){
    console.log("done1")
}

const createProduct = async function (req, res) {
    try {
        const {imageUrl,productname,price,quantity,description,category,userid} = req.body
        console.log(imageUrl,productname,price,quantity,description,category,userid)
      const newProduct =  await Product.createProduct(imageUrl,productname,price,quantity,description,category,userid)
      console.log("check1")
      if(!newProduct){
        console.log("check2")
        return res.status(500).json({ error: "Failed to create Product" });
      }
      
      res.status(200).json({ message: "Product created successfully", newProduct: newProduct });
    } catch (error) {
        console.log("Error in createProduct:", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const updateProduct = async function (req, res) {
    
    try {
        const productId = req.params.productId
        const newProduct =  await Product.updateProduct(productId, req.body)
        if(!newProduct){
            return res.status(500).json({ error: "Product not found" });
        }
        
        res.status(200).json({ message: "Product updated successfully", newProduct:newProduct});
    } catch (error) {
        console.log("Error in updateProduct controller:", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const deleteProduct = async function (req, res) {
    try {
        const productId = req.params.recipieId
        const deletedProduct =  await Product.deleteProduct(productId)
        if(!deletedProduct){
            return res.status(500).json({ error: "Product not found" });
        }
        
        res.status(200).json({ message: "Product deleted successfully", deletedProduct: deletedProduct, productId: deletedProduct._id });
    } catch (error) {
        console.log("Error in deleteProduct controller:", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const getProducts = async function (req, res) {
    //all recipies
    try {
        const products =  await Product.getProducts()
        if(!products){
            return res.status(500).json({ error: "Products not found" });
        }
        res.status(201).json(products)
    } catch (error) {
        console.log("Error in getProducts controller:", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const getProductId = async function (req, res) {
    try {
        const id = req.params.id;
        const product = await Product.getProduct(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.log("Error in getProductId controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports={createProduct,updateProduct,deleteProduct,getProducts,checking,getProductId}