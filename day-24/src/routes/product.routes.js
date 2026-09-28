import express from 'express'
import { createNewProduct, deleteProduct, getAllProducts, getProductById, UpdateProduct } from '../controllers/product.controller.js'

const router = express.Router()

// /api/
router.get("/", getAllProducts)
router.post("/", createNewProduct)
router.get("/:id", getProductById)
router.patch('/:id', UpdateProduct)
router.delete('/:id', deleteProduct)

export default router