import { useState } from "react";
import { ChatButton } from "./ChatButton";
import { ChatBox } from "./ChatBox";
import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: ReactNode;
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "system",
      content: (
        <div className="flex flex-col gap-2">
          <p>How can I help you?</p>
          <div className="flex flex-col gap-3 mt-2">
            <button className="bg-white text-gray-900 font-semibold p-3 hover:bg-gray-50 border border-gray-700 cursor-pointer select-none">
              Option 1
            </button>
            <button className="bg-white text-gray-900 font-semibold p-3 hover:bg-gray-50 border border-gray-700 cursor-pointer select-none">
              Option 2
            </button>
            <button className="bg-white text-gray-900 font-semibold p-3 hover:bg-gray-50 border border-gray-900 cursor-pointer select-none">
              Option 3
            </button>
            <button className="bg-white text-gray-900 font-semibold p-3 hover:bg-gray-50 border border-gray-900 cursor-pointer select-none">
              Option 4
            </button>
            <button className="bg-white text-gray-900 font-semibold p-3 hover:bg-gray-50 border border-gray-900 cursor-pointer select-none">
              Option 5
            </button>
          </div>
        </div>
      ),
    },
  ]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatBox
            key="chatbox"
            messages={messages}
            setMessages={setMessages}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      {!isOpen && <ChatButton onClick={() => setIsOpen(true)} />}
    </>
  );
};
