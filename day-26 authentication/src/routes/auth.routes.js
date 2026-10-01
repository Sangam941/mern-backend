import express from 'express'
import { login, Register } from '../controllers/auth.controllers.js'

const router = express.Router()
// /auth/register
router.post("/register", Register)
router.post("/login", login)

export default router