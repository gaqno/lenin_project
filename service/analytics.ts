import { getApiUrl } from "~/lib/api-config";

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
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/metrics/analytics`, {
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
