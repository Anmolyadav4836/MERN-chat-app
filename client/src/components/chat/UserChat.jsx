import React from "react";
import { useContext } from "react";
import moment from "moment";
import avatar from "../../assets/avatar.svg";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";

const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const { onlineUsers, notifications, markThisUserNotificationAsRead } = useContext(ChatContext);
    const { latestMessage } = useFetchLatestMessage(chat);

    const isOnline = onlineUsers?.some(user => user?.userId === recipientUser?._id);
    const unreadNotification = unreadNotificationsFunc(notifications);
    const thisUserNotifications = unreadNotification?.filter(n => n?.senderId === recipientUser?._id);

    const truncateText = (text) => {
        let shortText = text.substring(0, 20);
        if (text.length > 20) {
            shortText += "...";
        }
        return shortText;
    };

    return (
        <div
            role="button"
            className="flex items-center justify-between p-3 rounded-lg bg-gray-100  cursor-pointer hover:scale-102 transition duration-200"
            onClick={() => {
                if (thisUserNotifications?.length !== 0) {
                    markThisUserNotificationAsRead(thisUserNotifications, notifications);
                }
            }}
        >
            {/* Left side - Avatar and Text */}
            <div className="flex items-center space-x-3">
                <img src={avatar} alt="avatar" className="h-9 w-9" />
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{recipientUser?.name}</span>
                    {latestMessage?.text && (
                        <span className="text-sm text-gray-500">{truncateText(latestMessage.text)}</span>
                    )}
                </div>
            </div>

            {/* Right side - Time and Notification */}
            <div className="flex flex-col items-end text-right space-y-1">
                <span className="text-xs text-gray-400">
                    {moment(latestMessage?.createdAt).calendar(null, {
                        sameDay: 'dddd DD/MM/YYYY h:mm a',
                        nextDay: 'dddd DD/MM/YYYY h:mm a',
                        nextWeek: 'dddd DD/MM/YYYY h:mm a',
                        lastDay: 'dddd DD/MM/YYYY h:mm a',
                        lastWeek: 'dddd DD/MM/YYYY h:mm a',
                        sameElse: 'dddd DD/MM/YYYY h:mm a'
                    })}
                </span>

                {thisUserNotifications?.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                        {thisUserNotifications.length}
                    </span>
                )}

                {isOnline && (
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-1"></span>
                )}
            </div>
        </div>
    );
};

export default UserChat;
