import React from "react";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import UserChat from "../components/chat/UserChat";
import PotentialChats from "../components/chat/PotentialChat";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);

    return (
        <div className="p-4 space-y-4 h-screen">
            {/* Top Bar with Users */}
            <div className="flex items-center w-full h-16 px-4 border rounded-lg border-gray-500">
                <p className="mr-4 text-white font-bold">USERS:</p>
                <div className="flex items-center">
                    <PotentialChats /> 
                </div>
            </div>

            {/* Chat Section */}
            
                {userChats?.length < 1 ? null : (
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-8 items-start">
                        {/* User Chats */}
                        <div className="flex flex-col gap-4 pr-4 pt-4 flex-shrink-0">
                            {isUserChatsLoading && <p>Loading Chats...</p>}
                            {userChats?.map((chat, index) => (
                                <div
                                    key={index}
                                    onClick={() => updateCurrentChat(chat)}
                                    className="cursor-pointer rounded-lg border border-gray-500 p-2"
                                >
                                    <UserChat chat={chat} user={user} />
                                </div>
                            ))}
                        </div>

                        {/* Chat Box */}
                        <div className="flex-grow ">
                            <ChatBox />
                        </div>
                    </div>
                )}
         
        </div>
    );
};

export default Chat;
