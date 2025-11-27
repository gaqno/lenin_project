export const useUserMetrics = () => {
  const getTimezone = () => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return null;
    }
  };

  const getLanguage = () => {
    try {
      return navigator.language || navigator.languages?.[0];
    } catch {
      return null;
    }
  };

  const setMetricsHeaders = () => {
    const timezone = getTimezone();
    const language = getLanguage();

    // Set custom headers for the next request
    const headers = new Headers();
    if (timezone) {
      headers.set("x-user-timezone", timezone);
    }
    if (language) {
      headers.set("x-user-language", language);
    }

    return headers;
  };

  return {
    getTimezone,
    getLanguage,
    setMetricsHeaders,
  };
};
