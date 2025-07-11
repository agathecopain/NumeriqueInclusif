import express from "express";
import {
  showArticleForm,
  edit,
  updateArticle,
  deleteArticle,
} from "../controllers/articlesControllers.js";
import { upload } from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/edit", upload.single("image"), edit);

router.get("/edit", verifyToken, authorizeRoles("admin"), showArticleForm);
router.put("/:id", updateArticle);

router.delete("/:id", deleteArticle);



export default router;

