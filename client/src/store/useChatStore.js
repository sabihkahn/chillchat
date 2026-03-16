import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useChatStore = create((set,get)=>({
allContacts:[],
chats:[],
messages:[],
activeTab:"chats",
selectedUser:null,
isUsersLoading:false,
isMessagesLoading:false,
isSoundEnbled: localStorage.getItem("isSoundEnbled") === "true",


//`toogle sound on/off  just change based on the boolen we get eg: !Boolean

    toogleSound: () => {
        const newValue = !get().isSoundEnbled;
        localStorage.setItem("isSoundEnbled", newValue);
        set({ isSoundEnbled: newValue });
    },
// active tabs means [chats || contacts ]

setActiveTab:(tab)=>{
    set({ activeTab : tab})
},

// select a user when we click on any users it will then put the values like
// id,name,email in the selecteduser variable 

setSelectedUsers:(selectedUser1)=>{
set({selectedUser:selectedUser1})
console.log(selectedUser1);

},

// getAllContacts from backend  actually fetching all the user data from db

getAllContacts: async()=>{
    try {

        set({ isUsersLoading : true})
        const res = await axiosInstance.get('/messages/contacts')
        set({ allContacts : res.data})
    } catch (error) {
        toast.error(error.response.data.message)
        console.log("error occur in getAllContacts",error);
        
    }
    finally{
        set({isUsersLoading:false})
    }
},

// fetch the users data which you have chated 

getMychatpartners:async()=>{
    try {
        set({isUsersLoading:true})
        const res = await axiosInstance.get('/messages/chats')
        set({chats:res.data})
    } catch (error) {
        toast.error(error.response.data.message)
        console.log("Error in gerMYChatparteners function",error);
        
    }
    finally{
        set({isUsersLoading:false})
    }
},

// getmessages by selectiin user in contact/chats we will send both our id and userid in db and then query the users

getMessagesByuserid:async(userid)=>{

    set({isMessagesLoading:true})

    try {
        const response = await axiosInstance.get(`/messages/${userid}`)
        set({messages:response.data})


    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong")
        console.log("Error in getusermesasge by id function",error);
        
    }
    finally{
        set({isMessagesLoading:false})
    }
},

    //send message to a chatperson or contact sendmesage
    sendmesage:async(messageData)=>{
        try {

            const res = await axiosInstance.post(`/messages/send/${get().selectedUser._id}`,messageData)
            set({ messages: get().messages.concat(res.data)})

        } catch (error) {
            console.log("error in sendmessage route",error);
            toast.error(error.response.data.message || "Something went wrong ") 
        }
    }

}))