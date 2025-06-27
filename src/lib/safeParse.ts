'use client';
export function safeParse<T>(data: unknown): T | null {
  try {
    if (typeof data === 'string') {
      const firstParse = JSON.parse(data);
      if (typeof firstParse === 'object' && firstParse !== null) {
        return firstParse as T;
      }
      try {
        const secondParse = JSON.parse(firstParse);
        return secondParse as T;
      } catch (error) {
        return firstParse as T;
      }
    }

    if (typeof data === 'object' && data !== null) {
      return data as T;
    }

    return null;
  } catch (e) {
    console.warn('[safeParse] Failed:', e);
    return null;
  }
}
