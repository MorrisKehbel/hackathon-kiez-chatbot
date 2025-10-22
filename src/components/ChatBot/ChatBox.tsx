import { useRef, useEffect, useState } from "react";
import { Chat } from "./Chat";
import { ChatInput } from "./ChatInput";
import { HiXMark, HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { motion } from "framer-motion";
import { About, SignUp, Profile, Feedback, Map } from "./Settings";
import { useUser } from "../../context/UserProvider";
import type { Message } from "./ChatWidget";
import type { Variants } from "framer-motion";

type ChatBoxProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onClose: () => void;
};

export const ChatBox = ({ messages, setMessages, onClose }: ChatBoxProps) => {
  const { user, loggedIn, logout } = useUser();
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<
    "chat" | "signup" | "profile" | "about" | "feedback" | "map"
  >("chat");

  console.log(user, loggedIn);

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
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 hover:bg-gray-200/70 rounded-full cursor-pointer"
        >
          <HiMiniEllipsisHorizontal color="black" size={25} />
        </button>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200/70 rounded-full cursor-pointer"
        >
          <HiXMark color="black" size={25} />
        </button>
      </div>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white border border-gray-200 rounded-lg shadow-md p-3 m-2"
        >
          {user ? (
            <>
              <button
                onClick={() => {
                  setActiveView("profile");
                  setMenuOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                My Profile
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setActiveView("signup");
                  setMenuOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                Sign-up/Sign-in
              </button>
            </>
          )}

          <button
            onClick={() => {
              setActiveView("map");
              setMenuOpen(false);
            }}
            className="w-full text-left p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            Berlin Map
          </button>
          <button
            onClick={() => {
              setActiveView("about");
              setMenuOpen(false);
            }}
            className="w-full text-left p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            About BÄR BUDDY
          </button>
          <button
            onClick={() => {
              setActiveView("feedback");
              setMenuOpen(false);
            }}
            className="w-full text-left p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            Feedback
          </button>
          {user && (
            <button
              onClick={() => {
                logout();
                setActiveView("chat");
                setMenuOpen(false);
              }}
              className="w-full text-left p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              Sign Out
            </button>
          )}
        </motion.div>
      )}

      <ChatInput
        messages={messages}
        setMessages={setMessages}
        setActiveView={setActiveView}
      />

      {activeView === "chat" && <Chat messages={messages} chatRef={chatRef} />}
      {activeView === "signup" && <SignUp setActiveView={setActiveView} />}
      {activeView === "profile" && <Profile />}
      {activeView === "about" && <About />}
      {activeView === "feedback" && <Feedback />}
      {activeView === "map" && <Map />}
    </motion.div>
  );
};
