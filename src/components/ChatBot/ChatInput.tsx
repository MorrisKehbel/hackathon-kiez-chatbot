import { useState } from "react";
import { IoSend } from "react-icons/io5";
import bearbuddyIcon from "../../assets/bearbuddy_icon.webp";
import type { Message } from "./ChatWidget";

type ChatInputProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setActiveView: React.Dispatch<
    React.SetStateAction<
      "chat" | "signup" | "profile" | "about" | "feedback" | "map"
    >
  >;
};

export const ChatInput = ({
  messages,
  setMessages,
  setActiveView,
}: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    const botMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "test response",
    };

    setMessages([...messages, userMsg, botMsg]);
    setActiveView("chat");
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border-t border-gray-200 flex items-center"
    >
      <div className="flex w-full shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <img
          src={bearbuddyIcon}
          alt="Buddy"
          className=" w-15 h-14 select-none"
          draggable="false"
        />
        <div className="relative w-full">
          <input
            name="message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Ask me as your buddy!"
            className="w-full h-14 rounded-tr-lg rounded-br-lg pl-4 py-4 pr-10 text-sm focus:outline-none bg-white placeholder:select-none placeholder:text-gray-400 placeholder:font-semibold"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 ${
              !input.trim()
                ? "text-gray-400 cursor-not-allowed"
                : "text-red-600 cursor-pointer hover:scale-105 transition duration-300"
            }`}
            aria-label="send message"
          >
            <IoSend size={18} />
          </button>
        </div>
      </div>
    </form>
  );
};
