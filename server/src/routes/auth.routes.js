import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controllers.js';
import validate from '../middleware/validation.middleware.js';
import { registerValidation,loginValidation } from '../validators/auth.validator.js';


const router= express.Router();

router.post('/register',registerValidation,validate, registerUser
);

router.post('/login',loginValidation,validate,loginUser);

export default router;