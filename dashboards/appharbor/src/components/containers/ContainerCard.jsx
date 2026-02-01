import React from 'react';
import ContainerActions from './ContainerActions';
import { getStatusColor, formatContainerName } from '../../utils/formatters';

const ContainerCard = ({
  container,
  isSelected,
  onClick,
  onStart,
  onStop,
  onRestart,
  onRemove,
}) => {
  return (
    <div
      className={`container-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(container)}
    >
      <div className="container-header">
        <div className="container-info">
          <div
            className="status-indicator"
            style={{ backgroundColor: getStatusColor(container.state) }}
          ></div>
          <div>
            <h3>{container.name}</h3>
            <p className="image-name">{container.image}</p>
          </div>
        </div>
        <span
          className="status-badge"
          style={{ color: getStatusColor(container.state) }}
        >
          {container.state}
        </span>
      </div>

      <ContainerActions
        container={container}
        onStart={onStart}
        onStop={onStop}
        onRestart={onRestart}
        onRemove={onRemove}
      />
    </div>
  );
};

export default ContainerCard;