import type { Message } from "../components/ChatBot/ChatWidget";

export const addOrUpdateMsg = (
  msgs: Message[],
  asstMsg: Message,
  newText: string
): Message[] => {
  const msgExists = msgs.some((m) => m.id === asstMsg.id);

  if (!msgExists) {
    return [...msgs, { ...asstMsg, content: newText }];
  }

  return msgs.map((m) =>
    m.id === asstMsg.id
      ? {
          ...m,
          content:
            typeof m.content === "string" ? m.content + newText : newText,
        }
      : m
  );
};
