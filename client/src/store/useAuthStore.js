import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import toast from 'react-hot-toast';
import {io} from 'socket.io-client'


const BaseUrl = import.meta.env.MODE === "development" ? "http://localhost:3000/" : '/'

export const useAuthStore = create((set,get)=>({
    
    // socket connection 

    socket:null, 
    onlineUsers: [],



    connectSocket: () => {
        const { authUser, socket } = get();

        if (!authUser || socket?.connected) return;

        const newSocket = io(BaseUrl, {
            withCredentials: true,
        });

        set({ socket: newSocket });

        newSocket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },


    disconnectsocket: () => {
        const socket = get().socket;
        if (socket?.connected) socket.disconnect();
    },
    // Signup function and all related functions will go here
        

    

     isSigningUp: false,
    
    signup: async (userData)=>{
        try {
            set({isSigningUp: true});
            const res = await axiosInstance.post('/auth/signup', userData);
            set({authUser: res.data});
            toast.success("Account created successfully!");
            get().connectSocket()
        } catch (error) {
            console.log("Error while signing up",error);
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            set({isSigningUp: false});
       
        }
    }, 
    // login function starts from here 

    
    isLoggingIn:false,
    login: async(data)=>{
         
       try {
           set({isLoggingIn:true})
           const res = await axiosInstance.post('/auth/login', { email: data.email, password: data.password })
           set({ authUser :res.data})
           toast.success("Login succeed");
           get().connectSocket()
        } catch (error) {
           toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        console.log("Error occur in login function in useAuthStore",error);
           set({ authUser: null })
       }
       finally{
        set({isLoggingIn:false})
       }
         
    },
    // logout function from here 

    
     logout:async()=>{
         try {
          await axiosInstance.post('/auth/logout')
          set({authUser:null})
           toast.success("Logout succeed")
             get().disconnectsocket()
          } catch (error) {
          console.log("error occur in the logout function",error);
          toast.error(error.response?.data?.message || "Logout failed")
         }
         },
 

         //update profile
    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in update profile:", error);
            toast.error(error.response.data.message);
        }
    },
         

    // check auth function and all related functions will go here

    authUser: null,

   isCheckingAuth: true,

  
    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get('/auth/check');
            set({authUser: res.data.user});
            get().connectSocket()
        } catch (error) {
            console.log("Error while checking Auth",error);
            set({authUser: null});
        }
        finally{
            set({isCheckingAuth: false});
        }
    }


}))