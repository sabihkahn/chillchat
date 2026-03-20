import { useCallback, useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const Calling = () => {
  const { selectedUser, callData, clearCall } = useChatStore();
  const { socket } = useAuthStore();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const iceQueue = useRef([]);
  const startedRef = useRef(false);

  const userId = selectedUser?._id;
  const isReceiver = !!callData;

  useEffect(() => {
    if (!socket || !userId) return;

    const init = async () => {
      if (peerRef.current) {
        peerRef.current.close();
        peerRef.current = null;
      }
      iceQueue.current = [];

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      peerRef.current = pc;

      // LOCAL STREAM
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localVideoRef.current.srcObject = stream;

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      // REMOTE STREAM
      pc.ontrack = (e) => {
        console.log("🔥 REMOTE TRACK");
        remoteVideoRef.current.srcObject = e.streams[0];
      };

      // ICE SEND
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("ice-candidate", {
            candidate: e.candidate,
            to: userId,
          });
        }
      };

      // RECEIVE ANSWER
      socket.on("call-answered", async ({ answer }) => {
        await pc.setRemoteDescription(answer);

        iceQueue.current.forEach((c) => pc.addIceCandidate(c));
        iceQueue.current = [];
      });

      // RECEIVE ICE
      socket.on("ice-candidate", async ({ candidate }) => {
        if (pc.remoteDescription) {
          await pc.addIceCandidate(candidate);
        } else {
          iceQueue.current.push(candidate);
        }
      });
    };

    init();

    return () => {
      socket.off("call-answered");
      socket.off("ice-candidate");

      if (peerRef.current) {
        peerRef.current.close();
        peerRef.current = null;
      }
    };
  }, [socket, userId]);

  // ✅ CALL (caller only)
  const startCall = useCallback(async () => {
    const pc = peerRef.current;
    if (!pc) return;

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("offer", {
      offer,
      to: userId,
    });
  }, [socket, userId]);

  // Caller: auto-send the offer as soon as the Calling view mounts.
  // This makes the header "Call" button behave as "start the call".
  useEffect(() => {
    if (callData) return; // receiver will click "Accept"
    if (!socket || !userId) return;
    if (startedRef.current) return;
    startedRef.current = true;

    // Fire and forget; we don't await inside effect.
    startCall();
  }, [callData, socket, userId, startCall]);

  // ✅ ACCEPT (receiver only)
  const acceptCall = async () => {
    const pc = peerRef.current;
    const { offer, from } = callData;

    await pc.setRemoteDescription(offer);

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket.emit("answer", {
      answer,
      to: from,
    });

    iceQueue.current.forEach((c) => pc.addIceCandidate(c));
    iceQueue.current = [];
  };

  return (
<div className="h-screen bg-gradient-to-br from-gray-900 to-black flex justify-center items-center relative overflow-hidden">

  {/* REMOTE VIDEO */}
  <video
    ref={remoteVideoRef}
    autoPlay
    playsInline
    className="w-full h-full object-cover"
  />

  {/* DARK OVERLAY FOR READABILITY */}
  <div className="absolute inset-0 bg-black/30 pointer-events-none" />

  {/* LOCAL VIDEO (FLOATING CARD) */}
  <div className="absolute top-4 right-4 rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
    <video
      ref={localVideoRef}
      autoPlay
      muted
      className="w-44 h-32 object-cover"
    />
  </div>

  {/* CONTROLS BAR */}
  <div className="absolute bottom-8 flex items-center gap-6 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg shadow-lg border border-white/10">

    {isReceiver ? (
      <button
        onClick={acceptCall}
        className="bg-green-500 hover:bg-green-600 transition px-5 py-2 rounded-full text-white font-medium shadow-md"
      >
        Accept
      </button>
    ) : (
      <button
        onClick={startCall}
        className="bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-full text-white font-medium shadow-md"
      >
        Call
      </button>
    )}

    <button
      onClick={clearCall}
      className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-full text-white font-medium shadow-md"
    >
      End
    </button>
  </div>

</div>
  );
};

export default Calling;