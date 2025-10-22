import { useState } from "react";
import { ChatButton } from "./ChatButton";
import { ChatBox } from "./ChatBox";
import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: ReactNode;
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: (
        <div className="flex flex-col gap-2">
          <p>How can I help you?</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <button className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-500 cursor-pointer select-none">
              Option 1
            </button>
            <button className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-500 cursor-pointer select-none">
              Option 2
            </button>
            <button className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-500 cursor-pointer select-none">
              Option 3
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
