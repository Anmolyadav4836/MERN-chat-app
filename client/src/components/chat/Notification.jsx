import React from "react";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";

const Notification = () => {
    const [isOpen, setIsOpen] = useState(null);
    const { user } = useContext(AuthContext);
    const { notifications, userChats, allUsers, markAllAsRead, markNotificationAsRead } = useContext(ChatContext);

    // Filter unread notifications
    const unreadNotifications = unreadNotificationsFunc(notifications);

    // Enhance notifications with sender name
    const modifiedNotifications = notifications.map((n) => {
        const sender = allUsers.find((user) => user._id === n.senderId);
        return {
            ...n,
            senderName: sender?.name,
        };
    });

    return (
        <div className="relative">
            {/* Notification icon */}
            <div
                className="relative cursor-pointer p-1 rounded hover:bg-gray-200 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-chat-left-text-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
                </svg>

                {/* Notification count badge */}
                {unreadNotifications?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {unreadNotifications.length}
                    </span>
                )}
            </div>

            {/* Notification dropdown box */}
            {isOpen && (
                <div className="absolute top-8 right-0 w-72 bg-gray-500 shadow-lg rounded-lg z-50 border border-gray-300">
                    {/* Header */}
                    <div className="flex justify-between items-center px-4 py-2 border-b">
                        <h3 className="text-md font-semibold">Notifications</h3>
                        <button
                            onClick={() => markAllAsRead(notifications)}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Mark All As Read
                        </button>
                    </div>

                    {/* No Notifications */}
                    {modifiedNotifications?.length === 0 && (
                        <div className="flex items-center justify-center p-4 text-black">
                            No Notifications
                        </div>
                    )}

                    {/* Notification list */}
                    <div className="max-h-64 overflow-y-auto">
                        {modifiedNotifications.map((n, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    markNotificationAsRead(n, userChats, user, notifications);
                                    setIsOpen(false);
                                }}
                                className={`px-4 py-2 cursor-pointer text-sm ${
                                    n.isRead
                                        ? "hover:bg-gray-500"
                                        : "bg-gray-400  font-medium"
                                }`}
                            >
                                <p>{`${n.senderName} sent you a new message`}</p>
                                <p className="text-xs text-black mt-1">
                                    {moment(n.date).calendar(null, {
                                        sameDay: 'dddd DD/MM/YYYY h:mm a',
                                        nextDay: 'dddd DD/MM/YYYY h:mm a',
                                        nextWeek: 'dddd DD/MM/YYYY h:mm a',
                                        lastDay: 'dddd DD/MM/YYYY h:mm a',
                                        lastWeek: 'dddd DD/MM/YYYY h:mm a',
                                        sameElse: 'dddd DD/MM/YYYY h:mm a',
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;
