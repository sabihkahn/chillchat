import Message from "../model/Message.js"
import User from "../model/User.js"
import cloudinary from '../libs/cloudinary.js'


export const getAllContacts = async (req, res) => {
    try {
        const LogedInUserId = req.user.id
        const allcontacts = await User.find({ _id: { $ne: LogedInUserId } }).select("-password")
        res.status(200).json(allcontacts)

    } catch (error) {
        console.log("Error in getAllcontact Controller", error);
        res.status(500).json({ message: "Internal Server Error" })

    }
}




export const getMessagebyuserId = async (req, res) => {
    try {
        const id = req.params.id
        const LogedInUserId = req.user.id

        const messages = await Message.find({
            $or: [
                { senderId: LogedInUserId, receiverId: id },
                { senderId: id, receiverId: LogedInUserId }
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("error in getMessagebyuserID", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const sendMessage = async (req, res) => {
    try {
        const id = req.params.id
        const LogedInUserId = req.user.id
        const { text, image } = req.body

        if (!text && !image) {
            return res.status(400).json({ message: "Text or image is required." });
        }
        if (senderId.equals(receiverId)) {
            return res.status(400).json({ message: "Cannot send messages to yourself." });
        }
        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found." });
        }



        let message = text
        let imageURl
        if (image) {
            const result = await cloudinary.uploader.upload(image)
            imageURl = result.secure_url
        }


        const newMessage = new Message({
            senderId: LogedInUserId,
            receiverId: id,
            text: message,
            image: imageURl
        })

        await newMessage.save()

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in sendMessage", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}



export const getChatsPartners = async (req, res) => {
    try {
        const LogedInUserId = req.user.id

        const messages = await Message.find({
            $or: [
                { senderId: LogedInUserId },
                { receiverId: LogedInUserId }
            ]
        })

        const chatPartnersIds = [...new Set(
            messages.map(msg => msg.senderId.toString() === LogedInUserId ? msg.receiverId.toString() : msg.senderId.toString())
        )]
        const chatPartners = await User.find({
            _id: {
                $in: chatPartnersIds
            }
        }).select("-password")

        res.status(200).json(chatPartners)

    } catch (error) {
        console.log("Error in getchatsPartners");
        res.status(500).json({ message: "Internal Server Error" })

    }
}

