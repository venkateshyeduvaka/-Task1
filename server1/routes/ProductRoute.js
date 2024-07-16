const express=require("express")

const {createProduct,updateProduct,deleteProduct,getProducts,getProductId}=require("../controllers/ProductController")

const router=express.Router()



router.get('/', getProducts)
router.get("/:id",getProductId)


router.post('/add',createProduct)

router.put('/:productId', updateProduct)

router.delete('/:productId', deleteProduct)

module.exports=router