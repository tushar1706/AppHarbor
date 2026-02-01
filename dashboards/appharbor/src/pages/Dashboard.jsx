import React, { useState } from 'react';
import Header from '../components/layout/Header';
import ContainerList from '../components/containers/ContainerList';
import DetailPanel from '../components/details/DetailPanel';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useContainers } from '../hooks/useContainers';
import { useContainerLogs } from '../hooks/useContainerLogs';
import { useContainerStats } from '../hooks/useContainerStats';
import { dockerApi } from '../services/dockerApi';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [showAll, setShowAll] = useState(true);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { containers, loading, refetch } = useContainers(showAll);
  const { logs } = useContainerLogs(selectedContainer?.Id);
  const { stats } = useContainerStats(selectedContainer?.Id);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleAction = async (containerId, action) => {
    try {
      await dockerApi[`${action}Container`](containerId);
      setTimeout(refetch, 500);
    } catch (error) {
      console.error(`Error ${action}ing container:`, error);
    }
  };

  const handleRemove = async (containerId, force = false) => {
    if (!window.confirm('Are you sure you want to remove this container?')) return;
    try {
      await dockerApi.removeContainer(containerId, force);
      if (selectedContainer?.Id === containerId) {
        setSelectedContainer(null);
      }
      setTimeout(refetch, 500);
    } catch (error) {
      console.error('Error removing container:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard">
      <Header
        showAll={showAll}
        onToggleShowAll={setShowAll}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      <div className="main-content">
        <ContainerList
          containers={containers}
          selectedContainer={selectedContainer}
          onSelectContainer={setSelectedContainer}
          onStart={(id) => handleAction(id, 'start')}
          onStop={(id) => handleAction(id, 'stop')}
          onRestart={(id) => handleAction(id, 'restart')}
          onRemove={handleRemove}
        />

        <DetailPanel
          container={selectedContainer}
          stats={stats}
          logs={logs}
        />
      </div>
    </div>
  );
};

export default Dashboard;