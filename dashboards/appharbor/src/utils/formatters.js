export const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };
  
  export const formatCPU = (cpu) => {
    return cpu ? `${cpu.toFixed(2)}%` : '0%';
  };
  
  export const getStatusColor = (state) => {
    switch (state?.toLowerCase()) {
      case 'running':
        return 'rgb(34, 197, 94)';
      case 'exited':
        return 'rgb(239, 68, 68)';
      case 'paused':
        return 'rgb(251, 191, 36)';
      default:
        return 'rgb(156, 163, 175)';
    }
  };
  
  export const formatContainerName = (names) => {
    if (!names || names.length === 0) return 'Unnamed';
    return names.replace('/', '');
  };