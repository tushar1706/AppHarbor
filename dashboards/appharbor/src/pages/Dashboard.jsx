import React, { useState } from 'react';
// import Sidebar from '../components/layout/Sidebar';
import ContainerList from '../components/containers/ContainerList';
import DetailPanel from '../components/details/DetailPanel';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useContainers } from '../hooks/useContainers';
import { useContainerLogs } from '../hooks/useContainerLogs';
import { useContainerStats } from '../hooks/useContainerStats';
import { dockerApi } from '../services/dockerApi';
import '../styles/Dashboard.css';
import {RefreshCw,Plus} from 'lucide-react';
const Dashboard = () => {
  const [showAll, setShowAll] = useState(true);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { containers, loading, refetch } = useContainers(showAll);
  const { logs } = useContainerLogs(selectedContainer?.id);
  const { stats } = useContainerStats(selectedContainer?.id);
  // const [activeSection, setActiveSection] = useState("containers");
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
      if (selectedContainer?.id === containerId) {
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
      <div className='action-btn-container'>

       <div className="actions-btns">
        <button className='add-btn'><Plus size={18}/> New App</button>
          <label className="toggle">
            <input
              type="checkbox"
              checked={showAll}
              onChange={(e) => setShowAll(e.target.checked)}
            />
            <span>Show all containers</span>
          </label>
          <button
            className={`icon-btn ${refreshing ? 'spinning' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw size={18} />
          </button>
        </div>

      </div>
  <div style={{ display: "flex" }}>
      {/* <Sidebar
        active={activeSection}
        onSelect={setActiveSection}
      /> */}

      {/* <main style={{ padding: "20px", flex: 1}}> */}
        {/* <h2>{activeSection.toUpperCase()}</h2> */}
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
      {/* </main> */}
    </div>
     {/* Render Docker data here */}
     
    </div>
  );
};

export default Dashboard;