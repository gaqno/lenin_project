export interface IClientMetrics {
  user_ip: string | null;
  user_city: string | null;
  user_country: string | null;
  user_region: string | null;
  user_browser: string | null;
  user_os: string | null;
  user_device: string | null;
  user_language: string | null;
  user_timezone: string | null;
}

export const useClientMetrics = () => {
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

  const parseUserAgent = (userAgent: string): { browser: string | null; os: string | null; device: string | null } => {
    if (!userAgent) return { browser: null, os: null, device: null };

    let browser = null;
    let os = null;
    let device = null;

    // Browser detection
    if (userAgent.includes('Chrome')) {
      browser = 'Chrome';
    } else if (userAgent.includes('Firefox')) {
      browser = 'Firefox';
    } else if (userAgent.includes('Safari')) {
      browser = 'Safari';
    } else if (userAgent.includes('Edge')) {
      browser = 'Edge';
    } else if (userAgent.includes('Opera')) {
      browser = 'Opera';
    }

    // OS detection
    if (userAgent.includes('Windows')) {
      os = 'Windows';
    } else if (userAgent.includes('Mac OS X')) {
      os = 'macOS';
    } else if (userAgent.includes('Linux')) {
      os = 'Linux';
    } else if (userAgent.includes('Android')) {
      os = 'Android';
    } else if (userAgent.includes('iOS')) {
      os = 'iOS';
    }

    // Device detection
    if (userAgent.includes('Mobile')) {
      device = 'Mobile';
    } else if (userAgent.includes('Tablet')) {
      device = 'Tablet';
    } else {
      device = 'Desktop';
    }

    return { browser, os, device };
  };

  const getClientMetrics = async (): Promise<IClientMetrics> => {
    const userAgent = navigator.userAgent;
    const browserInfo = parseUserAgent(userAgent);
    const timezone = getTimezone();
    const language = getLanguage();

    // Get IP address using a public service
    let userIp = null;
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      userIp = data.ip;
    } catch (error) {
      console.error('Error getting IP address:', error);
    }

    // Get location from IP
    let city = null;
    let country = null;
    let region = null;

    if (userIp) {
      try {
        const response = await fetch(`http://ip-api.com/json/${userIp}?fields=city,country,regionName`);
        const data = await response.json();

        if (data.status === 'success') {
          city = data.city || null;
          country = data.country || null;
          region = data.regionName || null;
        }
      } catch (error) {
        console.error('Error resolving IP location:', error);
      }
    }

    return {
      user_ip: userIp,
      user_city: city,
      user_country: country,
      user_region: region,
      user_browser: browserInfo.browser,
      user_os: browserInfo.os,
      user_device: browserInfo.device,
      user_language: language,
      user_timezone: timezone,
    };
  };

  return {
    getClientMetrics,
    getTimezone,
    getLanguage,
  };
}; 