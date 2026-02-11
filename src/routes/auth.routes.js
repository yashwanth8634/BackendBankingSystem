import express from "express";
const router = express.Router()
import authController from '../controllers/auth.controller.js'

/**  POST /api/auth/register */
router.post('/register',authController.userRegisterController)

/** POST /api/auth/login */
router.post('/login',authController.userLoginController)





export default router