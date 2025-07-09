import express from "express";
import {
  showArticleForm,
  listArticle,
  edit,
  updateArtcile,
  deleteArticle,
} from "../controllers/articlesControllers.js";

const router = express.Router();

router.post("/edit", edit);
router.get("/", listArticle);
router.get("/edit", showArticleForm);
router.put("/:id", updateArtcile);
router.delete("/:id", deleteArticle);

export default router;
