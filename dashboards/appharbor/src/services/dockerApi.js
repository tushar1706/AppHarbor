const API_BASE = 'http://localhost:3001/docker';

export const dockerApi = {
  // Get all containers
  getContainers: async (showAll = true) => {
    const response = await fetch(`${API_BASE}/containers?all=${showAll}`);
    if (!response.ok) throw new Error('Failed to fetch containers');
    return response.json();
  },

  // Get container details
  getContainer: async (containerId) => {
    const response = await fetch(`${API_BASE}/containers/${containerId}`);
    if (!response.ok) throw new Error('Failed to fetch container details');
    return response.json();
  },

  // Get container logs
  getLogs: async (containerId, tail = 50) => {
    const response = await fetch(`${API_BASE}/containers/${containerId}/logs?tail=${tail}`);
    if (!response.ok) throw new Error('Failed to fetch logs');
    return response.text();
  },

  // Get container stats
  getStats: async (containerId) => {
    const response = await fetch(`${API_BASE}/containers/${containerId}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  // Start container
  startContainer: async (containerId) => {
    const response = await fetch(`${API_BASE}/containers/${containerId}/start`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to start container');
    return response.json();
  },

  // Stop container
  stopContainer: async (containerId) => {
    const response = await fetch(`${API_BASE}/containers/${containerId}/stop`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to stop container');
    return response.json();
  },

  // Restart container
  restartContainer: async (containerId) => {
    const response = await fetch(`${API_BASE}/containers/${containerId}/restart`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to restart container');
    return response.json();
  },

  // Remove container
  removeContainer: async (containerId, force = false) => {
    const response = await fetch(
      `${API_BASE}/containers/${containerId}${force ? '?force=true' : ''}`,
      { method: 'DELETE' }
    );
    if (!response.ok) throw new Error('Failed to remove container');
    return response.json();
  },
};