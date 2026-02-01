import React from 'react';
import { Terminal } from 'lucide-react';

const LogsSection = ({ logs }) => {
  return (
    <div className="logs-section">
      <div className="section-header">
        <Terminal size={16} />
        <span>Container Logs</span>
      </div>
      <pre className="logs-content">{logs || 'No logs available'}</pre>
    </div>
  );
};

export default LogsSection;