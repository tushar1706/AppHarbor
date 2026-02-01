const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

async function test() {
  console.log('Testing Docker connection...');
  
  try {
    // Test 1: Docker info
    const info = await docker.info();
    console.log('Docker Info:', {
      containers: info.Containers,
      containersRunning: info.ContainersRunning,
      containersPaused: info.ContainersPaused,
      containersStopped: info.ContainersStopped
    });
    
    // Test 2: List containers
    const containers = await docker.listContainers({ all: true });
    console.log(`\nContainers found: ${containers.length}`);
    
    if (containers.length > 0) {
      console.log('\nFirst container:', JSON.stringify(containers[0], null, 2));
    }
    
    // Test 3: Raw list
    console.log('\nAll containers:', JSON.stringify(containers, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
