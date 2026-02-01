import React from 'react';
import { Container } from 'lucide-react';
import ContainerCard from './ContainerCard';
import EmptyState from '../common/EmptyState';

const ContainerList = ({
  containers,
  selectedContainer,
  onSelectContainer,
  onStart,
  onStop,
  onRestart,
  onRemove,
}) => {
  if (containers.length === 0) {
    return <EmptyState icon={Container} message="No containers found" />;
  }

  return (
    <div className="container-list">
      {containers.map((container) => (
        <ContainerCard
          key={container.Id}
          container={container}
          isSelected={selectedContainer?.Id === container.Id}
          onClick={onSelectContainer}
          onStart={onStart}
          onStop={onStop}
          onRestart={onRestart}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default ContainerList;