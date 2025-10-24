const API_URL = import.meta.env.VITE_API_URL_CHAT;
const baseURL = `${API_URL}/chat`;

export const fetchChatRes = async (chatInput: string) => {
  try {
    const res = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: chatInput,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to get chat response");
    }

    const data = await res.json();
    const items = data.results ?? [];
    const total = items.length;

    return { total, items };
  } catch (error) {
    console.error("Error creating chat response:", error);
    throw error;
  }
};
