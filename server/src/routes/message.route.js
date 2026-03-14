import express from  'express'
import { getAllContacts, getChatsPartners, getMessagebyuserId, sendMessage } from '../controller/message.controller.js'

const router = express.Router()


router.get('/contacts',getAllContacts)

router.get('/chats',getChatsPartners)

router.get('/:id',getMessagebyuserId)

router.get('/send/:id',sendMessage)

export default router