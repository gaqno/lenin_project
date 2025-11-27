const API_BASE_URL = process.env.NUXT_PUBLIC_API_URL;

export interface IAnalyticsData {
  totalQuestions: number | null;
  metrics: {
    byCountry: Record<string, number>;
    byBrowser: Record<string, number>;
    byDevice: Record<string, number>;
    byOS: Record<string, number>;
  };
}

export const useAnalytics = async (): Promise<IAnalyticsData> => {
  const response = await fetch(`${API_BASE_URL}/metrics/analytics`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Erro ao buscar analytics" }));
    throw new Error(errorData.message || "Erro ao buscar analytics");
  }

  return response.json();
};
