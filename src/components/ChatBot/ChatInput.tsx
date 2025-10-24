import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { HiMicrophone } from "react-icons/hi2";
import bearbuddyIcon from "../../assets/bearbuddy_icon.webp";
import { fetchChatRes } from "../../data/chat";
import { chatBot } from "../../data/chatFallback";
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

export const ChatInput = ({ setMessages, setActiveView }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setActiveView("chat");

    try {
      const response = await fetchChatRes(input);

      const expectedResponse = {
        total: 5,
        items: [
          {
            id: "lang-001002",
            category: "language",
            title: "German Evening Course - C2",
            snippet:
              "Provider: Goethe-Institut Berlin | Level: C2 | Duration: 8-12 weeks (72 lessons) | Price: €799 | Location: Neue Schönhauser Str. 20, 10178 Berlin",
            url: "https://www.goethe.de/ins/de/en/ort/ber.html",
            lat: 52.5247707,
            lon: 13.406223,
            score: 0,
          },
          {
            id: "lang-000118",
            category: "language",
            title: "Evening - B2",
            snippet:
              "Provider: Sprachenatelier Berlin | Level: B2 | Duration: Ongoing | Price: €220/month | Location: Friedrichshain, Berlin",
            url: "https://www.sprachenatelier-berlin.de/en/",
            lat: 52.5122154,
            lon: 13.4502904,
            score: 0,
          },
          {
            id: "lang-000120",
            category: "language",
            title: "Evening - B2",
            snippet:
              "Provider: Sprachenatelier Berlin | Level: B2 | Duration: Ongoing | Price: €220/month | Location: Friedrichshain, Berlin",
            url: "https://www.sprachenatelier-berlin.de/en/",
            lat: 52.5122154,
            lon: 13.4502904,
            score: 0,
          },
          {
            id: "lang-000121",
            category: "language",
            title: "Evening - B2",
            snippet:
              "Provider: Sprachenatelier Berlin | Level: B2 | Duration: Ongoing | Price: €220/month | Location: Friedrichshain, Berlin",
            url: "https://www.sprachenatelier-berlin.de/en/",
            lat: 52.5122154,
            lon: 13.4502904,
            score: 0,
          },
          {
            id: "lang-000122",
            category: "language",
            title: "Evening - B2",
            snippet:
              "Provider: Sprachenatelier Berlin | Level: B2 | Duration: Ongoing | Price: €220/month | Location: Friedrichshain, Berlin",
            url: "https://www.sprachenatelier-berlin.de/en/",
            lat: 52.5122154,
            lon: 13.4502904,
            score: 0,
          },
        ],
      };

      const isExactMatch =
        response &&
        JSON.stringify(response) === JSON.stringify(expectedResponse);

      if (
        response.total === 0 ||
        isExactMatch ||
        !Array.isArray(response.items)
      ) {
        const userInput = input.trim();

        const asstMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "",
        };
        setMessages((prev) => [...prev, asstMsg]);

        await chatBot({
          messages: userInput,
          asstMsg,
          setMessages,
        });

        return;
      }

      const content = (
        <div className="flex flex-col gap-2">
          {response.items.map((item: any) => {
            const companyMatch = item.snippet.match(/Company:\s*([^|]*)/);
            const locationMatch = item.snippet.match(/Location:\s*([^|]*)/);

            const company = companyMatch ? companyMatch[1].trim() : "";
            const location = locationMatch ? locationMatch[1].trim() : "";

            return (
              <div key={item.id} className="p-3 mb-2 border shadow-sm bg-white">
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600 mb-1">
                  {company} {location && `– ${location}`}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      className="text-red-600 text-xs hover:underline"
                      rel="noreferrer"
                    >
                      View job
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );

      const botMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Something went wrong while loading the response 😢",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border-t border-gray-200 flex items-center"
    >
      <div className="flex w-full border border-gray-300">
        <img
          src={bearbuddyIcon}
          alt="Buddy"
          className="w-15 h-14 select-none"
          draggable="false"
        />
        <div className="relative w-full">
          <input
            name="message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Ask me as your buddy!"
            className="w-full h-14 rounded-tr-lg rounded-br-lg pl-4 py-4 pr-26 text-sm focus:outline-none bg-white placeholder:select-none placeholder:text-gray-400 placeholder:font-semibold"
          />

          <div className="absolute right-0 top-0 bottom-0 flex items-center border-l border-gray-300 pl-2 pr-2 bg-white">
            <span className=" p-2 text-gray-400 cursor-pointer hover:text-gray-500">
              <HiMicrophone size={23} />
            </span>
            <button
              type="submit"
              disabled={!input.trim()}
              className={`p-2 ${
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
      </div>
    </form>
  );
};
