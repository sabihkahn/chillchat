import { useEffect } from "react";
import { useChatStore } from '../store/useChatStore';
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
    const { selectedUser, setSelectedUsers } = useChatStore();
    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape") setSelectedUsers(null);
        };
        window.addEventListener("keydown", handleEscKey);
        return () => window.removeEventListener("keydown", handleEscKey);
    }, [setSelectedUsers]);

    // Safety check to prevent errors
    if (!selectedUser) return null;

    const isOnline = onlineUsers.includes((selectedUser._id).toString());
    console.log("onlineUsers:", onlineUsers);
    console.log("selectedUser:", selectedUser._id.toString());
    return (
        <div className="flex justify-between items-center bg-slate-900/50 backdrop-blur-md border-b border-slate-700/50 h-[84px] px-6">
            <div className="flex items-center space-x-4">

                {/* FIXED: Standard daisyUI structure for avatar indicators */}
                <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                    <div className="w-12 rounded-full ring-1 ring-slate-700">
                        <img
                            src={selectedUser.profilePic || "/avatar.png"}
                            alt={selectedUser.fullName}
                            className="object-cover"
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-slate-100 font-medium leading-tight">
                        {selectedUser.fullName}
                    </h3>
                    <p className={`text-xs ${isOnline ? "text-emerald-500" : "text-slate-500"}`}>
                        {isOnline ? "Online" : "Offline"}
                    </p>
                </div>
            </div>

            <button
                onClick={() => setSelectedUsers(null)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors group"
            >
                <XIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-100" />
            </button>
        </div>
    );
};

export default ChatHeader;