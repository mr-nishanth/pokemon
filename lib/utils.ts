// pokemon-explorer/lib/utils.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str: string): string {
  if (typeof str !== 'string' || !str.trim()) {
    return '';
  }

  return str
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const fetchWithRetry = async <T>(
  url: string,
  retries = 3,
  delay = 1000
): Promise<T | null> => {
  try {
    const res = await axios.get<T>(url);
    return res.data;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying ${url}... (${retries} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry<T>(url, retries - 1, delay * 2); // Exponential backoff
    } else {
      console.error(`Failed to fetch ${url} after multiple attempts`);
      return null; // Return null if all retries fail
    }
  }
};
