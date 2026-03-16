import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "../components/UserLoginSkelton";

const ContactList = () => {
  const { getAllContacts, allContacts, setSelectedUsers, isUsersLoading } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  // Static indicators as requested
  const isOnlineStatic = true;

  return (
    <div className="flex flex-col gap-1 p-2">
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-800/50 active:bg-slate-800 transition-colors group"
          onClick={() => setSelectedUsers(contact)}
        >
          {/* AVATAR WITH GREEN/GRAY INDICATOR */}
          <div className={`avatar ${isOnlineStatic ? "online" : "offline"}`}>
            <div className="size-12 rounded-full ring-1 ring-slate-700">
              <img
                src={contact.profilePic || "/avatar.png"}
                alt="profile"
                className="object-cover"
              />
            </div>
          </div>

          {/* NAME */}
          <div className="flex-1 min-w-0">
            <h4 className="text-slate-200 font-medium truncate">
              {contact.fullName}
            </h4>
            <p className="text-xs text-slate-500">
              {isOnlineStatic ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;