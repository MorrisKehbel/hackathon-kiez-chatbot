import { addOrUpdateMsg } from "../utils/msgUtils";
import type { Message } from "../components/ChatBot/ChatWidget";

const API_URL = import.meta.env.VITE_API_URL_FALLBACK;
const baseURL = `${API_URL}/ai/fallback`;

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatBotParams {
  messages: string;
  asstMsg: Message;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const chatBot = async ({
  messages,
  asstMsg,
  setMessages,
}: ChatBotParams) => {
  try {
    const res = await fetch(`${baseURL}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Unknown error");
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error("No response body received");

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter((line) => line.trim() !== "");

      for (const line of lines) {
        if (line === "data: [DONE]") return;

        if (line.startsWith("data: ")) {
          const { text } = JSON.parse(line.replace("data: ", ""));
          setMessages((prev) => addOrUpdateMsg(prev, asstMsg, text));
        }
      }
    }
  } catch (error) {
    console.error("Streaming error:", error);
    throw error;
  }
};
