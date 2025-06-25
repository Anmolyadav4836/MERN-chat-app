import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import InputEmoji from "react-input-emoji";
import moment from "moment";

const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState("");
    const messagesEndRef = useRef(null);

    // Auto-scroll to the latest message when messages update
    useEffect(() => {
        // Optional: Check if user is near the bottom before auto-scrolling
        const container = document.getElementById("messages-container");
        if (container) {
            const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
            if (isNearBottom) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [messages]);

    // Case when no chat is selected
    if (!recipientUser)
        return (
            <p className="text-center w-full h-screen pt-40 text-gray-500">
                No conversation selected yet
            </p>
        );

    // Case when messages are still loading
    if (!messages && isMessagesLoading)
        return (
            <p className="text-center w-full h-screen pt-40 text-gray-500">
                Loading messages
            </p>
        );

    return (
        <div className="pt-4">
            {/* Chat container with spacing and scroll area */}
            <div className="flex flex-col gap-6 bg-white rounded-lg shadow-sm p-4 max-h-[85vh] overflow-y-auto">
                
                {/* Chat header showing recipient's name */}
                <div className="text-lg font-semibold border-b pb-2">
                    {recipientUser?.name}
                </div>

                {/* Messages container */}
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] pr-2">
                    {messages && messages.map((msg, index) => (
                        <div
                            key={index}
                            ref={scroll}
                            // Conditional styling based on sender (left or right)
                            className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                                msg?.senderId === user?._id
                                    ? "self-end bg-green-100 text-right"
                                    : "self-start bg-gray-100 text-left"
                            }`}
                        >
                            {/* Message text */}
                            <span className="block text-sm text-gray-800">{msg.text}</span>

                            {/* Timestamp formatted with moment.js */}
                            <span className="block text-xs text-gray-400 mt-1">
                                {moment(msg.createdAt).calendar(null, {
                                    sameDay: 'dddd DD/MM/YYYY h:mm a',
                                    nextDay: 'dddd DD/MM/YYYY h:mm a',
                                    nextWeek: 'dddd DD/MM/YYYY h:mm a',
                                    lastDay: 'dddd DD/MM/YYYY h:mm a',
                                    lastWeek: 'dddd DD/MM/YYYY h:mm a',
                                    sameElse: 'dddd DD/MM/YYYY h:mm a',
                                })}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Message input and send button */}
                <div className="flex items-center gap-3 mt-auto">
                    
                    {/* Emoji input field */}
                    <div className="flex-grow">
                        <InputEmoji
                            value={textMessage}
                            onChange={setTextMessage}
                            fontFamily="Oswald"
                            borderColor="rgba(10, 200, 10, 0.5)"
                        />
                    </div>

                    {/* Send button */}
                    <button
                        onClick={() =>
                            sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
                        }
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                        title="Send Message"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="currentColor"
                            className="bi bi-send-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
