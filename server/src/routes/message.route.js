import express from  'express'
import { getAllContacts, getChatsPartners, getMessagebyuserId, sendMessage } from '../controller/message.controller.js'
import {authorization} from '../middleware/authorization.middleware.js'
const router = express.Router()


router.get('/contacts',authorization,getAllContacts)

router.get('/chats',authorization,getChatsPartners)

router.get('/:id',authorization,getMessagebyuserId)
router.post('/send/:id',authorization,sendMessage)

export default router