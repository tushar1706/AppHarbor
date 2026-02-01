import { useState, useEffect } from 'react';
import { dockerApi } from '../services/dockerApi';

export const useContainerLogs = (containerId) => {
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!containerId) {
      setLogs('');
      return;
    }

    const fetchLogs = async () => {
      setLoading(true);
      try {
        const data = await dockerApi.getLogs(containerId);
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setLogs('Error loading logs');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [containerId]);

  return { logs, loading };
};