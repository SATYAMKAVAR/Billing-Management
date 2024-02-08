import express  from "express";
import {deleteUser, getUser, test, updateUser} from "../controllers/user.controller.js";
const router = express.Router();

router.get('/test',test);
router.get('/:id',getUser);
router.post('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

export default router;