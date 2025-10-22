import { ChatBubble } from "./ChatBubble";
import type { RefObject } from "react";
import type { Message } from "./ChatWidget";
import { motion } from "motion/react";

type ChatProps = {
  messages: Message[];
  chatRef: RefObject<HTMLDivElement | null>;
};

export const Chat = ({ messages, chatRef }: ChatProps) => {
  return (
    <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-4">
      {messages.map((msg) => (
        <motion.div layout="position" key={msg.id}>
          <ChatBubble message={msg} />
        </motion.div>
      ))}
    </div>
  );
};
