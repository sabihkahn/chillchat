

export const getAllContacts = async(req,res)=>{
    res.send("from message route get all contacts")
}

export const getChatsPartners = async(req,res)=>{
    res.send("from message route get chat partners")
}
export const getMessagebyuserId = async(req,res)=>{
    res.send("from message route get messages by user id")
}
export const sendMessage = async(req,res)=>{
    res.send("from message route send message")
}

// export const sendMessage = async(req,res)=>{
//     res.send("from message route send message")
// }

// export const getMessages = async(req,res)=>{
//     res.send("from message route get messages")
// }

// export const deleteMessage = async(req,res)=>{
//     res.send("from message route delete message")
// }