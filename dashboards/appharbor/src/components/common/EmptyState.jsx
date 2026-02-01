import React from 'react';

const EmptyState = ({ icon: Icon, message }) => {
  return (
    <div className="empty-state">
      <Icon size={48} strokeWidth={1} />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;