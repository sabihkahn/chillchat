import React, { useEffect, useRef } from "react";
import { Mic, Video, PhoneOff } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const Calling = () => {
  const { selectedUser, setiscalling } = useChatStore();
  const { socket } = useAuthStore();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);

  const userId = selectedUser?._id;

  useEffect(() => {
    const init = async () => {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
        ],
      });

      peerRef.current = pc;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localVideoRef.current.srcObject = stream;

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      pc.ontrack = (e) => {
        remoteVideoRef.current.srcObject = e.streams[0];
      };

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("ice-candidate", {
            candidate: e.candidate,
            userId: userId,
          });
        }
      };

      // ✅ HANDLE RECEIVED OFFER
      if (window.callData?.offer) {
        const { offer, from } = window.callData;

        await pc.setRemoteDescription(offer);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.emit("answer", {
          answer,
          userId: from,
        });

        window.callData = null;
      }

      // ✅ ANSWER RECEIVED (caller side)
      socket.on("call-answered", async ({ answer }) => {
        await pc.setRemoteDescription(answer);
      });

      // ✅ ICE
      socket.on("ice-candidate", async ({ candidate }) => {
        try {
          await pc.addIceCandidate(candidate);
        } catch (err) {
          console.log("ICE error", err);
        }
      });
    };

    init();

    return () => {
      socket.off("call-answered");
      socket.off("ice-candidate");

      if (peerRef.current) peerRef.current.close();
    };
  }, []);

  // ✅ CALL USER
  const startCall = async () => {
    const pc = peerRef.current;

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("offer", {
      offer,
      userId: userId, // ✅ IMPORTANT FIX
    });

    setiscalling();
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative">

      {/* REMOTE */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="absolute w-full h-full object-cover"
      />

      {/* LOCAL */}
      <div className="absolute top-5 right-5 w-32 h-44 rounded-xl overflow-hidden">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      </div>

      {/* INFO */}
      <div className="absolute top-6 left-6 text-white">
        <h2>Calling {selectedUser?.fullName}</h2>
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-10 flex gap-6 bg-white/10 p-4 rounded-full">

        <button className="p-3 bg-gray-800 rounded-full">
          <Mic className="text-white" />
        </button>

        <button className="p-3 bg-gray-800 rounded-full">
          <Video className="text-white" />
        </button>

        <button
          onClick={() => setiscalling()}
          className="p-3 bg-red-600 rounded-full"
        >
          <PhoneOff className="text-white" />
        </button>

        <button
          onClick={startCall}
          className="p-3 bg-cyan-600 rounded-full text-white"
        >
          Call
        </button>
      </div>
    </div>
  );
};

export default Calling;