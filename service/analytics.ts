import { createSupabaseClient } from "~/lib/supabase";

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
  const supabase = createSupabaseClient();

  try {
    // Get total questions
    const { count: totalQuestions } = await supabase
      .from('lenin_questions')
      .select('*', { count: 'exact', head: true });

    // Get questions by country
    const { data: questionsByCountry } = await supabase
      .from('lenin_questions')
      .select('user_country')
      .not('user_country', 'is', null);

    // Get questions by browser
    const { data: questionsByBrowser } = await supabase
      .from('lenin_questions')
      .select('user_browser')
      .not('user_browser', 'is', null);

    // Get questions by device
    const { data: questionsByDevice } = await supabase
      .from('lenin_questions')
      .select('user_device')
      .not('user_device', 'is', null);

    // Get questions by OS
    const { data: questionsByOS } = await supabase
      .from('lenin_questions')
      .select('user_os')
      .not('user_os', 'is', null);

    // Calculate metrics
    const countryStats = questionsByCountry?.reduce((acc, item) => {
      const country = item.user_country;
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    const browserStats = questionsByBrowser?.reduce((acc, item) => {
      const browser = item.user_browser;
      acc[browser] = (acc[browser] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    const deviceStats = questionsByDevice?.reduce((acc, item) => {
      const device = item.user_device;
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    const osStats = questionsByOS?.reduce((acc, item) => {
      const os = item.user_os;
      acc[os] = (acc[os] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return {
      totalQuestions,
      metrics: {
        byCountry: countryStats,
        byBrowser: browserStats,
        byDevice: deviceStats,
        byOS: osStats,
      }
    };
  } catch (error) {
    console.error('Analytics error:', error);
    throw new Error('Falha ao buscar analytics.');
  }
}; 