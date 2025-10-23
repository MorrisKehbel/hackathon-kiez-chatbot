const API_URL = import.meta.env.VITE_API_URL;
const baseURL = `${API_URL}/api/search`;

export const fetchKiezData = async (body: Record<string, any>) => {
  try {
    const res = await fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch data");
    }

    const data = await res.json();
    console.log(data);

    return data.items;
  } catch (error) {
    console.error("Error fetching Kiez data:", error);
    throw error;
  }
};
