import express from 'express';
import {listContacts, submitContactForm} from '../controllers/contactControllers.js'

const router= express.Router();

router.get('/', listContacts);
router.post('/', submitContactForm);


export default router




