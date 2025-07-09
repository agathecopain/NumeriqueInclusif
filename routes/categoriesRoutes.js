import express from "express";
import {body} from "express-validator";
import { addCategorie, listerCategories } from "../controllers/categoriesControllers.js";
import {validate} from "../middleware/validation.js";

const router = express.Router();
router.post(
  "/",
  [
    body("nom").notEmpty().withMessage("Le nom est requis"),
    body("description").notEmpty().withMessage("La description est requise")
  ],
  validate,
  addCategorie
);
router.get("/", listerCategories);

export default router;

