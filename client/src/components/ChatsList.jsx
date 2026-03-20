import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "../components/UserLoginSkelton";
import NoChatsFound from "../components/NochatFound";

const ChatsList = () => {
  const { getMychatpartners, chats, isUsersLoading, setSelectedUsers, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore(); // Assuming your authStore tracks online IDs

  useEffect(() => {
    getMychatpartners();
  }, [getMychatpartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;
  console.log("chat id",chats);
  
  return (
    <div className="flex flex-col gap-2 p-2">
      {chats.map((chat) => {
        // Check if the user is actually online based on your socket/auth store
        const isOnline = onlineUsers?.includes(chat._id.toString());
        const isSelected = selectedUser?._id === chat._id.toString();
        console.log(isOnline,isSelected);
        console.log("chat id",chat);
        
        
        return (
          <button
            key={chat._id}
            onClick={() => setSelectedUsers(chat)}
            className={`
              w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group
              ${isSelected
                ? "bg-cyan-500/20 ring-1 ring-cyan-500/50"
                : "hover:bg-slate-800/50 bg-transparent"}
            `}
          >
            {/* AVATAR SECTION - Fixed daisyUI classes */}
            <div className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}>
              <div className="size-12 rounded-full ring-2 ring-slate-700 group-hover:ring-cyan-500/50 transition-all">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                  className="object-cover"
                />
              </div>
            </div>

            {/* USER INFO */}
            <div className="text-left min-w-0">
              <h4 className={`font-semibold truncate transition-colors ${isSelected ? "text-cyan-400" : "text-slate-200"}`}>
                {chat.fullName}
              </h4>
              <p className="text-xs text-slate-500 truncate">
                {isOnline ? "Active now" : "Offline"}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChatsList;