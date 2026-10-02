import express from 'express'
import { getMe, login, logout, Register } from '../controllers/auth.controllers.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()
// /auth/register
router.post("/register", Register)
router.post("/login", login)
router.get("/logout", authMiddleware, logout)
router.get("/me",authMiddleware, getMe)

export default router