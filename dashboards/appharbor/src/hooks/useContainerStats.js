import { useState, useEffect } from 'react';
import { dockerApi } from '../services/dockerApi';
import { useRef } from "react";
export const useContainerStats = (containerId, refreshInterval = 3000) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const previousStatsRef = useRef(null);
  useEffect(() => {
    if (!containerId) {
      setStats(null);
      return;
    }

    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await dockerApi.getStats(containerId);
    
        let cpuPercent = 0;
    
        if (previousStatsRef.current) {
          cpuPercent = getCpuPercent(previousStatsRef.current, data);
        }
    
        const memUsage = data.memory_stats?.usage || 0;
        const memLimit = data.memory_stats?.limit || 0;
        const memPercent = memLimit ? (memUsage / memLimit) * 100 : 0;
    
        // Save snapshot for next calculation
        previousStatsRef.current = data;
    
        // 👇 Attach computed fields
        setStats({
          ...data,
          cpu_percent: cpuPercent,
          mem_percent: memPercent,
        });
    
      } catch (error) {
        console.error("Error fetching stats:", error);
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

function getCpuPercent(prevStats, currStats) {
  const prevTotal = prevStats.cpu_stats?.cpu_usage?.total_usage || 0;
  const prevSystem = prevStats.cpu_stats?.system_cpu_usage || 0;

  const currTotal = currStats.cpu_stats?.cpu_usage?.total_usage || 0;
  const currSystem = currStats.cpu_stats?.system_cpu_usage || 0;

  const cpus = currStats.cpu_stats?.online_cpus || 1;

  const cpuDelta = currTotal - prevTotal;
  const systemDelta = currSystem - prevSystem;

  if (cpuDelta > 0 && systemDelta > 0) {
    return (cpuDelta / systemDelta) * cpus * 100;
  }
  return 0;
}