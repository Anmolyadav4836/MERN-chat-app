import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

    return (
        <div className="flex gap-2 ">
            {potentialChats && potentialChats.map((u, index) => (
                <div
                    key={index}
                    onClick={() => createChat(user._id, u._id)}
                    className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg cursor-pointer
                    bg-white hover:bg-gray-100 hover:scale-102 transition duration-200"
                >
                    <span className=" font-bold">{u.name}</span>
                    {/* Online Indicator */}
                    {onlineUsers?.some((user) => user?.userId === u?._id) && (
                        <span className="w-2 h-2 rounded-full bg-green-500 ml-2"></span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PotentialChats;
