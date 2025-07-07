import express from 'express';
import dotenv from 'dotenv'
import contactRoute from './routes/contactRoute.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.set('view engine', 'twig')
app.set('views', "./views")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/contact', contactRoute);



app.listen(PORT, () => {
    console.log(`le serveur tourne sur http://localhost:${PORT}`);
    
})