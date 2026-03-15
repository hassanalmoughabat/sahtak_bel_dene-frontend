import { useState } from 'react';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useApi<T, Args extends unknown[]>(
  apiFn: (...args: Args) => Promise<T>,
  options?: UseApiOptions<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (...args: Args) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiFn(...args);
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setIsLoading(false);
    setError(null);
  };

  return { data, isLoading, error, execute, reset };
}