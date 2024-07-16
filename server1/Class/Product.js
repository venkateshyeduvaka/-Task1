const ProductModel=require("../models/ProductModel")

class Product{
    constructor(imageUrl,productname,price,quantity,description,category,userid){  
        this.imageUrl=imageUrl
        this.productname=productname
        this.price=price 
        this.quantity=quantity 
        this.description=description
        this.category=category 
        this.userid=userid
    }


    static async createProduct(imageUrl,productname,price,quantity,description,category,userid) {
        try {
            const newProduct = new ProductModel({imageUrl,productname,price,quantity,description,category,userid});
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw new Error(`Product creation failed: ${error.message}`);
        }
    }


    
    static async updateProduct(productId, newData) {
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(productId, newData, { new: true });
            if (!updatedProduct) {
                throw new Error('Product not found');
            }
            return updatedProduct;
        } catch (error) {
            throw new Error(`Product update failed: ${error.message}`);
        }
    }

    static async deleteProduct(productId) {
        try {
            const deleteProduct = await ProductModel.findByIdAndDelete(productId);
            if (!deleteProduct) {
                throw new Error('Product not found');
            }
            return deleteProduct;
        } catch (error) {
            throw new Error(`Product deletion failed: ${error.message}`);
        }
    }

    static async getProducts() {
        try {
            const product = await ProductModel.find();
            if (!product) {
                throw new Error('Products not found');
            }
            return product;
        } catch (error) {
            throw new Error(`Fetching Product failed: ${error.message}`);
        }
    }

    static async getProduct(id) {
        try {
            const product = await ProductModel.findById(id);
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error(`Fetching product failed: ${error.message}`);
        }
    }
    

}


module.exports={Product}