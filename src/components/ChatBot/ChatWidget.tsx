import { useState } from "react";
import { ChatButton } from "./ChatButton";
import { ChatBox } from "./ChatBox";
import { AnimatePresence } from "framer-motion";
import { fetchKiezData } from "../../data/options";

export type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string | React.ReactNode;
};

const options = [
  {
    key: "techJobsKreuzberg",
    query: "Show me Software Developer jobs in Kreuzberg",
    body: {
      query: "Software Developer",
      topic: "job",
      district: "Kreuzberg",
      limit: 5,
    },
  },
  {
    key: "germanCoursesMitte",
    query: "Search for German courses",
    body: {
      query: "A1 German course",
      topic: "course",
      scope: "all",
      limit: 5,
    },
  },
  {
    key: "pythonJobs",
    query: "Where can I find coworking spaces",
    body: {
      query: "Coworking",
      scope: "all",
      limit: 5,
    },
  },
  {
    key: "upcomingTechMeetups",
    query: "Show me upcoming tech meetups in Berlin",
    body: {
      query: "Tech Meetup",
      topic: "event",
      scope: "all",
      sort_by: "date",
      sort_dir: "asc",
      limit: 5,
    },
  },
  {
    key: "allTechEvents",
    query: "List 5 tech events happening in Berlin",
    body: { query: "Tech Event", topic: "event", scope: "all", limit: 5 },
  },
];

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
            {options.map((opt) => (
              <button
                key={opt.key}
                className="bg-white text-gray-900 font-semibold p-3 hover:bg-gray-50 border border-gray-700 cursor-pointer select-none"
                onClick={() => handleOptionClick(opt)}
              >
                {opt.query}
              </button>
            ))}
          </div>
        </div>
      ),
    },
  ]);

  const handleOptionClick = async (opt: (typeof options)[0]) => {
    try {
      const items = await fetchKiezData(opt.body);

      const botMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: (
          <div className="flex flex-col gap-2">
            {items.map((item: any) => (
              <div key={item.id} className="p-3 mb-2 border shadow-sm bg-white">
                <h3 className="font-bold text-sm mb-1">
                  {item.title || item.course_name || item.query}
                </h3>
                {item.company && item.district && (
                  <p className="text-xs text-gray-600 mb-1">
                    {item.company} – {item.district}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {item.job_url && (
                    <a
                      href={item.job_url}
                      target="_blank"
                      className="text-red-600 text-xs hover:underline"
                      rel="noreferrer"
                    >
                      View job
                    </a>
                  )}
                  {item.job_url_direct && (
                    <a
                      href={item.job_url_direct}
                      target="_blank"
                      className="text-red-600 text-xs hover:underline"
                      rel="noreferrer"
                    >
                      Apply directly
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    }
  };

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
