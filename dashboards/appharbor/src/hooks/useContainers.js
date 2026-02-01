import { useState, useEffect, useCallback } from 'react';
import { dockerApi } from '../services/dockerApi';

export const useContainers = (showAll = true, refreshInterval = 5000) => {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContainers = useCallback(async () => {
    try {
      const data = await dockerApi.getContainers(showAll);
      setContainers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [showAll]);

  useEffect(() => {
    fetchContainers();
    const interval = setInterval(fetchContainers, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchContainers, refreshInterval]);

  return { containers, loading, error, refetch: fetchContainers };
};