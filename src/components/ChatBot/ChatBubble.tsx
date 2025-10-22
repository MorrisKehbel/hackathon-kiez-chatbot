import bearbuddyIcon from "../../assets/bearbuddy_icon.webp";
import type { Message } from "./ChatWidget";

type ChatBubbleProps = {
  message: Message;
};

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} items-end`}
    >
      {!isUser && (
        <img
          src={bearbuddyIcon}
          alt="Buddy"
          className="mr-2 w-6 h-6 rounded-full select-none"
        />
      )}

      <div
        className={`p-3 max-w-[75%] text-sm text-gray-900 rounded-lg shadow-sm whitespace-pre-wrap ${
          isUser ? "bg-gray-200 break-all" : "bg-white"
        }`}
      >
        {message.content}
      </div>

      {isUser && (
        <div className="ml-2 shrink-0 w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold select-none">
          Me
        </div>
      )}
    </div>
  );
};
