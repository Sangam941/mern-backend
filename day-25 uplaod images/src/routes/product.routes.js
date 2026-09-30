import express from 'express'
import { createNewProduct, deleteProduct, getAllProducts, getProductById, UpdateProduct } from '../controllers/product.controller.js'
import { upload } from '../middleware/multer.js'

const router = express.Router()

// /api/
router.get("/", getAllProducts)
router.post("/", upload.single('image'), createNewProduct)
router.get("/:id", getProductById)
router.patch('/:id',upload.single('image'), UpdateProduct)
router.delete('/:id', deleteProduct)

export default router