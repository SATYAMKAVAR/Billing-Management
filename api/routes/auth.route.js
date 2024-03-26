import express from 'express';
import {signup,signin, activeEmail, sendOTP} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/activeEmail',activeEmail);
router.post('/sendOTP',sendOTP);
// router.post('/google',google);

export default router;