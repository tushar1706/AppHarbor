import React from 'react';
import { Container, RefreshCw } from 'lucide-react';

const Header = ({ showAll, onToggleShowAll, onRefresh, refreshing }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="brand">
          <Container size={28} strokeWidth={1.5} />
          <h1>App Harbor</h1>
        </div>
        <div className="header-actions">
          <label className="toggle">
            <input
              type="checkbox"
              checked={showAll}
              onChange={(e) => onToggleShowAll(e.target.checked)}
            />
            <span>Show all containers</span>
          </label>
          <button
            className={`icon-btn ${refreshing ? 'spinning' : ''}`}
            onClick={onRefresh}
            disabled={refreshing}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;