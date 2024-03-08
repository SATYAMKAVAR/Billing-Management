import express  from "express";
import { addbills, deleteUser, deletebills, getBills, getCategories, getUser, test, updateCategories, updateUser, updatebills} from "../controllers/user.controller.js";
const router = express.Router();

router.get('/test',test);
router.get('/:id',getUser);
router.post('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get("/bills/:id", getBills);
router.post("/addBills/:id", addbills);
router.delete("/deleteBill/:id", deletebills);
router.put("/updateBill/:id", updatebills);
router.get('/getCategories/:id',getCategories);
router.put("/updateCategories/:id", updateCategories);
export default router;