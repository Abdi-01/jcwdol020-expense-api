import { Router } from "express";
import {
  addData,
  deleteData,
  getByCategory,
  getByDate,
  getById,
  getData,
  updateData,
} from "../controllers/expense.controller";

const router: Router = Router();

router.get("/", getData);
router.get("/:id", getById);
router.patch("/:id", updateData);
router.delete("/:id", deleteData);
router.post("/", addData);
router.get("/byCategory/:category", getByCategory);
router.get("/byDate/:startDate/:endDate", getByDate);

export default router;
