import React from 'react';
import { Play, Square, RotateCw, Trash2 } from 'lucide-react';

const ContainerActions = ({ container, onStart, onStop, onRestart, onRemove }) => {
  const isRunning = container.state === 'running';

  return (
    <div className="container-actions">
      {isRunning ? (
        <>
          <button
            className="action-btn stop"
            onClick={(e) => {
              e.stopPropagation();
              onStop(container.id);
            }}
            title="Stop"
          >
            <Square size={14} />
          </button>
          <button
            className="action-btn restart"
            onClick={(e) => {
              e.stopPropagation();
              onRestart(container.id);
            }}
            title="Restart"
          >
            <RotateCw size={14} />
          </button>
        </>
      ) : (
        <button
          className="action-btn start"
          onClick={(e) => {
            e.stopPropagation();
            onStart(container.id);
          }}
          title="Start"
        >
          <Play size={14} />
        </button>
      )}
      <button
        className="action-btn remove"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(container.id, isRunning);
        }}
        title="Remove"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default ContainerActions;