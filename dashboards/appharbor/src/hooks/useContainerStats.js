import { useState, useEffect } from 'react';
import { dockerApi } from '../services/dockerApi';

export const useContainerStats = (containerId, refreshInterval = 3000) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!containerId) {
      setStats(null);
      return;
    }

    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await dockerApi.getStats(containerId);
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, refreshInterval);
    return () => clearInterval(interval);
  }, [containerId, refreshInterval]);

  return { stats, loading };
};