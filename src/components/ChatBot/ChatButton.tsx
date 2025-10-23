import { useState } from "react";
import { motion } from "framer-motion";
import bearbuddyIcon from "../../assets/bearbuddy_icon.webp";

type ChatButtonProps = {
  onClick: () => void;
};

export const ChatButton = ({ onClick }: ChatButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="fixed top-1/2 right-0 z-50 flex items-center shadow-[0_0_10px_rgba(0,0,0,0.1)]"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.button
        onClick={onClick}
        layout
        initial={{ width: 80 }} // img width * 4
        animate={{ width: hovered ? 264 : 80 }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
        className="flex items-center justify-start overflow-hidden bg-white text-gray-900 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <img src={bearbuddyIcon} alt="Open Chat" className="w-20 h-18" />
          <motion.span
            initial={{ opacity: 0, x: 30 }}
            animate={{
              opacity: hovered ? 1 : 0,
              x: hovered ? 0 : 30,
            }}
            transition={{ duration: 0.25 }}
            className="whitespace-nowrap text-base font-semibold px-4"
          >
            Ask your buddy!
          </motion.span>
        </div>
      </motion.button>
    </motion.div>
  );
};
