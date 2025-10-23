import bearbuddyIcon from "../../assets/bearbuddy_icon.webp";
import type { Message } from "./ChatWidget";

type ChatBubbleProps = {
  message: Message;
};

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  return (
    <>
      {message.role !== "system" && (
        <div
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          } items-end`}
        >
          {message.role === "assistant" && (
            <img
              src={bearbuddyIcon}
              alt="Buddy"
              className="mr-2 w-6 h-6 rounded-full select-none"
            />
          )}

          <div
            className={`p-3 max-w-[75%] text-sm text-gray-900 shadow-sm whitespace-pre-wrap ${
              message.role === "user"
                ? "bg-gray-200 break-all rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                : "bg-white rounded-tl-lg rounded-tr-lg rounded-br-lg"
            }`}
          >
            {message.content}
          </div>

          {message.role === "user" && (
            <div className="ml-2 shrink-0 w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold select-none">
              Me
            </div>
          )}
        </div>
      )}

      {/* Optional: Wenn du system messages rein textlich zeigen willst */}
      {message.role === "system" && (
        <div className="text-center text-xs text-gray-500 my-2">
          {message.content}
        </div>
      )}
    </>
  );
};
