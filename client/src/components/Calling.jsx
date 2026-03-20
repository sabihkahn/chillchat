import React, { useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import {useChatStore} from '../store/useChatStore'

const Calling = () => {
  const { selectedUser, setiscalling } = useChatStore()
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const userId = selectedUser._id

  


  console.log(userId)

  useEffect(() => {
    const getUserMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // TEMP: show same stream as remote (for demo)
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.log("Error accessing media:", error);
      }
    };

    getUserMediaStream();
  }, []);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">

      {/* REMOTE VIDEO (FULL SCREEN) */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="absolute w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* LOCAL VIDEO (FLOATING) */}
      <div className="absolute top-5 right-5 w-32 h-44 md:w-40 md:h-52 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      </div>

      {/* USER INFO */}
      <div className="absolute top-6 left-6 text-white">
        <h2 className="text-xl font-semibold">Calling {selectedUser?selectedUser.fullName:"calling"}...</h2>
        <p className="text-sm text-gray-300">Connecting</p>
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-10 flex gap-6 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full shadow-lg border border-white/10">

        {/* MUTE */}
        <button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition">
          <Mic className="text-white" />
        </button>

        {/* CAMERA */}
        <button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition">
          <Video className="text-white" />
        </button>

        {/* END CALL */}
        <button 
         onClick={()=>{
            setiscalling()
         }}
        className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition">
          <PhoneOff className="text-white" />

        </button>
      </div>
    </div>
  );
};

export default Calling;