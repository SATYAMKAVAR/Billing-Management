import express from 'express';
import {signup,signin, activeEmail} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/activeEmail',activeEmail);
// router.post('/google',google);

export default router;