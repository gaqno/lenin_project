import type { H3Event } from 'h3';

export interface IUserMetrics {
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

export function extractUserMetrics(event: H3Event): IUserMetrics {
  const headers = getHeaders(event);
  const userAgent = headers['user-agent'] || '';

  // Extract IP address
  const forwardedFor = headers['x-forwarded-for'] as string;
  const realIp = headers['x-real-ip'] as string;
  const cfConnectingIp = headers['cf-connecting-ip'] as string;

  let userIp = null;
  if (cfConnectingIp) {
    userIp = cfConnectingIp;
  } else if (realIp) {
    userIp = realIp;
  } else if (forwardedFor) {
    userIp = forwardedFor.split(',')[0].trim();
  } else {
    const requestIP = getRequestIP(event);
    userIp = requestIP || null;
  }

  // Extract browser and OS information
  const browserInfo = parseUserAgent(userAgent);

  // Extract language
  const acceptLanguage = headers['accept-language'] as string;
  const userLanguage = acceptLanguage ? acceptLanguage.split(',')[0].split(';')[0] : null;

  // Extract timezone (will be set by client)
  const userTimezone = headers['x-user-timezone'] as string || null;

  return {
    user_ip: userIp,
    user_city: null, // Will be resolved by IP geolocation
    user_country: null, // Will be resolved by IP geolocation
    user_region: null, // Will be resolved by IP geolocation
    user_browser: browserInfo.browser,
    user_os: browserInfo.os,
    user_device: browserInfo.device,
    user_language: userLanguage,
    user_timezone: userTimezone,
  };
}

function parseUserAgent(userAgent: string): { browser: string | null; os: string | null; device: string | null } {
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
}

export async function resolveLocationFromIP(ip: string): Promise<{ city: string | null; country: string | null; region: string | null }> {
  try {
    // Using a free IP geolocation service
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=city,country,regionName`);
    const data = await response.json();

    if (data.status === 'success') {
      return {
        city: data.city || null,
        country: data.country || null,
        region: data.regionName || null,
      };
    }
  } catch (error) {
    console.error('Error resolving IP location:', error);
  }

  return { city: null, country: null, region: null };
} 