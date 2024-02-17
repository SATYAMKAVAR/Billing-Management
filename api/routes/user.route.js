import express  from "express";
import {addbills, deleteUser, deletebills, getBills, getUser, test, updateUser, updatebills} from "../controllers/user.controller.js";
const router = express.Router();

router.get('/test',test);
router.get('/:id',getUser);
router.post('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get("/bills/:id", getBills);
router.post("/bills/:id", addbills);
router.delete("/bills/:id", deletebills);
router.put("/bills/:id", updatebills);
export default router;