export const getApiUrl = (): string => {
  const apiUrl = process.env.NUXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not configured. Please set NUXT_PUBLIC_API_URL environment variable.");
  }
  return apiUrl;
};

