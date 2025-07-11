import express from "express";
import dotenv from "dotenv";
import contactRoute from "./routes/contactRoute.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import { getAllCategories } from "./models/CategoriesModel.js";
import { showCategorie } from "./controllers/categoriesControllers.js";
import path from "path";
import articleRoute from "./routes/articleRoute.js";
import { getAllArticles } from "./models/ArticlesModel.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.set("view engine", "twig");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contact", contactRoute);
app.use("/api/categories", categoriesRoutes);
app.use("/api/article", articleRoute);


app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});


app.get("/categories/:id", (req, res) => {
  const id = req.params.id;
  res.redirect(`/api/categories/${id}`);
});

app.get("/", async (req, res) => {
  try {
    const [categories] = await getAllCategories();
    const articles = await getAllArticles();
    console.log(articles);
    res.render("home", {
      user: req.session?.user || null,
      categories,
      articles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur serveur");
  }
});



app.listen(PORT, () => {
  console.log(`le serveur tourne sur http://localhost:${PORT}`);
});
