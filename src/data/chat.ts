const API_URL = import.meta.env.VITE_API_URL;
const baseURL = `${API_URL}/api/search`;

export const fetchChatRes = async (chatInput: string) => {
  try {
    const res = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: chatInput,
        limit: 5,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to get chat response");
    }

    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error creating chat response:", error);
    throw error;
  }
};
