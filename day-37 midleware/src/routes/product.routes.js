import express from 'express'
import { createNewProduct, deleteProduct, getAllProducts, getProductById, UpdateProduct } from '../controllers/product.controller.js'
import { upload } from '../middleware/multer.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { adminMiddleware } from '../middleware/admin.middleware.js'

const router = express.Router()

// /api/
router.get("/", getAllProducts)
router.post("/",authMiddleware, adminMiddleware, upload.single('image'), createNewProduct)
router.get("/:id", getProductById)
router.patch('/:id',authMiddleware, adminMiddleware, upload.single('image'), UpdateProduct)
router.delete('/:id',authMiddleware, adminMiddleware, deleteProduct)

export default router