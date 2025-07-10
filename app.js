import express from 'express';
import dotenv from 'dotenv'
import contactRoute from './routes/contactRoute.js';
import categoriesRoutes from './routes/categoriesRoutes.js'
import { getAllCategories } from './models/CategoriesModel.js';
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.set('view engine', 'twig')
app.set('views', "./views")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/contact", contactRoute);
app.use("/api/categories", categoriesRoutes);



app.get("/" , async (req, res) => {
    try {
        const [categories] = await getAllCategories();
       
        res.render("home", {
            user: req.session?.user || null,
            categories
        });
    }catch (err) {
        res.status(500).send ("Erreur serveur");
    }
})


app.listen(PORT, () => {
    console.log(`le serveur tourne sur http://localhost:${PORT}`);
    
})