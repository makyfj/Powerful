import express from "express";
import {
  createProgress,
  deleteProgressById,
  getAllProgress,
  getProgressById,
  updateProgressById,
} from "../controllers/progressController";
import { auth, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(auth, createProgress).get(auth, admin, getAllProgress);
router
  .route("/:id")
  .get(auth, getProgressById)
  .put(auth, updateProgressById)
  .delete(auth, deleteProgressById);

export { router as progressRoutes };
