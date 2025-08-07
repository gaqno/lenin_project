import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentLocalTime(timezone?: string): string {
  try {
    const now = new Date();
    const userTimezone = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    return now.toLocaleString('pt-BR', {
      timeZone: userTimezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  } catch (error) {
    console.error('Error getting current local time:', error);
    return new Date().toISOString();
  }
}

export function createLocalTimestamp(timezone?: string): string {
  try {
    const now = new Date();
    const userTimezone = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Create a date object in the user's timezone
    const localDate = new Date(now.toLocaleString('en-US', { timeZone: userTimezone }));

    // Format as ISO string but representing local time
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
    const seconds = String(localDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(localDate.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  } catch (error) {
    console.error('Error creating local timestamp:', error);
    return new Date().toISOString();
  }
}

export function formatSupabaseTimestamp(utcTimestamp: string, userTimezone?: string): string {
  try {
    // Remove timezone info if present (e.g., "+00" from "2025-08-07 12:29:18.542291+00")
    const cleanTimestamp = utcTimestamp.replace(/\+00$/, '');

    // Create date object from UTC timestamp
    const utcDate = new Date(cleanTimestamp + 'Z'); // Add Z to indicate UTC

    const timezone = userTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Convert to user's timezone
    return utcDate.toLocaleString('pt-BR', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  } catch (error) {
    console.error('Error formatting Supabase timestamp:', error);
    return utcTimestamp;
  }
}
