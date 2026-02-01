import React from 'react';

const StatCard = ({ label, value, percentage, barColor, children }) => {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      {children || (
        <>
          <span className="stat-value">{value}</span>
          {percentage !== undefined && (
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{
                  width: `${Math.min(percentage, 100)}%`,
                  backgroundColor: barColor,
                }}
              ></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StatCard;