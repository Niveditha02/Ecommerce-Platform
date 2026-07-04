import express from 'express';
import {signupUser} from '../controllers/authcontroller.js';

const router = express.Router();

router.post('/signupUser',signupUser);

export default router;