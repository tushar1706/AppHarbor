import React from 'react';
import StatCard from './StatCard';
import { formatBytes, formatCPU } from '../../utils/formatters';

const StatsGrid = ({ stats }) => {
  if (!stats) return null;

  const cpuPercent = stats.cpu_stats?.cpu_usage?.cpu_percent || 0;
  const memUsage = stats.memory_stats?.usage || 0;
  const memLimit = stats.memory_stats?.limit || 0;
  const memPercent = memLimit ? (memUsage / memLimit) * 100 : 0;

  return (
    <div className="stats-grid">
      <StatCard
        label="CPU Usage"
        value={formatCPU(cpuPercent)}
        percentage={cpuPercent}
        barColor="rgb(34, 197, 94)"
      />

      <StatCard
        label="Memory Usage"
        value={`${formatBytes(memUsage)} / ${formatBytes(memLimit)}`}
        percentage={memPercent}
        barColor="rgb(59, 130, 246)"
      />

      <StatCard label="Network I/O">
        <div className="network-stats">
          <span>↓ {formatBytes(stats.networks?.eth0?.rx_bytes || 0)}</span>
          <span>↑ {formatBytes(stats.networks?.eth0?.tx_bytes || 0)}</span>
        </div>
      </StatCard>

      <StatCard label="Block I/O">
        <div className="network-stats">
          <span>
            R{' '}
            {formatBytes(
              stats.blkio_stats?.io_service_bytes_recursive?.[0]?.value || 0
            )}
          </span>
          <span>
            W{' '}
            {formatBytes(
              stats.blkio_stats?.io_service_bytes_recursive?.[1]?.value || 0
            )}
          </span>
        </div>
      </StatCard>
    </div>
  );
};

export default StatsGrid;