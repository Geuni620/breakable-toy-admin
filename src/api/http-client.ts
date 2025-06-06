const BASE_URL = "http://localhost:3000";

export const httpClient = {
  get: async <T>(url: string) => {
    const res = await fetch(`${BASE_URL}${url}`);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json() as T;
  },
};
