import { Router } from "express";
import { addData, getByCategory, getByDate, getData } from "../controllers/expense.controller";

const router: Router = Router();

router.get("/", getData);
router.post("/", addData);
router.get("/byCategory/:category", getByCategory);
router.get("/byDate/:startDate/:endDate", getByDate);

export default router;