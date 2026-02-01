import React from 'react';
import { Activity, Terminal, Info } from 'lucide-react';
import StatsGrid from './StatsGrid';
import LogsSection from './LogsSection';
import EmptyState from '../common/EmptyState';
import { formatContainerName } from '../../utils/formatters';

const DetailPanel = ({ container, stats, logs }) => {
  if (!container) {
    return (
      <div className="detail-panel">
        <EmptyState icon={Info} message="Select a container to view details" />
      </div>
    );
  }

  return (
    <div className="detail-panel">
      <div className="detail-header">
        <h2>{formatContainerName(container.Names)}</h2>
        <div className="detail-tabs">
          <button className="tab active">
            <Activity size={16} />
            Stats
          </button>
          <button className="tab">
            <Terminal size={16} />
            Logs
          </button>
        </div>
      </div>

      <StatsGrid stats={stats} />
      <LogsSection logs={logs} />
    </div>
  );
};

export default DetailPanel;