import express from 'express';
import dotenv from 'dotenv'
import contactRoute from './routes/contactRoute.js';
import categoriesRoutes from './routes/categoriesRoutes.js'
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


app.listen(PORT, () => {
    console.log(`le serveur tourne sur http://localhost:${PORT}`);
    
})