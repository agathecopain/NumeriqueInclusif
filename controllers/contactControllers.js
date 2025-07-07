
import  {getAllContacts, createContact} from '../models/ContactModel.js';

export async function listContacts(req, res) {
    try {
        const contacts = await getAllContacts(); 
        res.render("contact", { contacts });  
    } catch (err) {
        console.error(err);
        res.status(500).render("contact", {
            error: "Erreur serveur",
            contacts: []
        });
    }
}

export async function submitContactForm(req, res) {
    try {
        const { name, firstname, email, messages } = req.body;

        if (!name || !firstname || !email || !messages) {
            return res.status(400).render("contact", { error: "Veuillez rentrer toutes les données" });
        }

        await createContact({ name, firstname, email, messages });

        res.status(201).render("contact", { success: "Contact enregistré avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).render("contact", { error: "Erreur serveur" });
    }
}

