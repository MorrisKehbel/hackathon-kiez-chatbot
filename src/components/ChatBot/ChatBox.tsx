import { useRef, useEffect } from "react";
import { Chat } from "./Chat";
import { ChatInput } from "./ChatInput";
import { HiXMark, HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { motion } from "framer-motion";
import type { Message } from "./ChatWidget";
import type { Variants } from "framer-motion";

type ChatBoxProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onClose: () => void;
};

export const ChatBox = ({ messages, setMessages, onClose }: ChatBoxProps) => {
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const chatVariants: Variants = {
    hidden: { opacity: 0, x: 300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, x: 300, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <motion.div
      className="fixed bottom-0 md:bottom-6 right-0 mx-auto md:mx-0 md:right-6 w-full md:w-100 h-160 md:h-200 bg-gray-100 border border-gray-200 rounded-t-2xl md:rounded-2xl shadow-xl flex flex-col overflow-hidden z-50"
      variants={chatVariants}
      layout
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex justify-between items-center p-2 border-b border-gray-200">
        <button className="p-2 hover:bg-gray-200/70 rounded-full cursor-pointer">
          <HiMiniEllipsisHorizontal color="black" size={25} />
        </button>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200/70 rounded-full cursor-pointer"
        >
          <HiXMark color="black" size={25} />
        </button>
      </div>

      <ChatInput messages={messages} setMessages={setMessages} />
      <Chat messages={messages} chatRef={chatRef} />
    </motion.div>
  );
};
