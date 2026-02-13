import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import Docker from 'dockerode';
import { Observable } from 'rxjs';
import * as os from 'os';


@Injectable()
export class DockerService implements OnModuleInit {
  private docker: Docker;
  private readonly logger = new Logger(DockerService.name);

  async onModuleInit() {
    // Initialize Docker connection
    // For local Docker daemon (default)
    this.docker = new Docker();

    // For remote Docker daemon, use:
    // this.docker = new Docker({
    //   host: 'localhost',
    //   port: 2375,
    //   protocol: 'http'
    // });
    // this.docker = new Docker({
    //     socketPath: '/var/run/docker.sock'
    //   });

    // this.logger.log('Docker service initialized');

    // Cross-platform Docker socket configuration
    // const platform = os.platform();
    
    // if (platform === 'win32') {
    //   // Windows
    //   this.docker = new Docker({
    //     socketPath: '//./pipe/docker_engine'
    //   });
    // } else {
    //   // Linux/Mac
    //   this.docker = new Docker({
    //     socketPath: '/var/run/docker.sock'
    //   });
    // }

    // this.logger.log(`Docker service initialized on ${platform}`);
    const socketPath = '/var/run/docker.sock';
    
    this.docker = new Docker({ socketPath });
    
    this.logger.log(`Docker service initialized`);
    this.logger.log(`Using socket: ${socketPath}`);
    
    // Verify connection
    try {
      const info = await this.docker.info();
      this.logger.log(`Connected! Containers: ${info.Containers} (${info.ContainersRunning} running)`);
      
      const containers = await this.docker.listContainers({ all: true });
      this.logger.log(`Found ${containers.length} containers`);
    } catch (error) {
      this.logger.error(`Connection failed: ${error.message}`);
    }
  }

  /**
   * List all containers
   * @param all - Include stopped containers
   */
  async listContainers(all: boolean = true): Promise<any[]> {
    try {
      this.logger.log(`Attempting to list containers (all=${all})...`);
      const containers = await this.docker.listContainers({ all });
      
      this.logger.log(`Raw response from Docker: ${JSON.stringify(containers)}`);
      this.logger.log(`Found ${containers.length} containers`);
      
      if (containers.length === 0) {
        this.logger.warn('No containers found!');
        return [];
      }
      
      return containers.map(container => {
        this.logger.log(`Processing container: ${container.Id}`);
        return {
          id: container.Id,
          name: container.Names[0].replace('/', ''),
          image: container.Image,
          state: container.State,
          status: container.Status,
          ports: container.Ports,
          created: container.Created,
        };
      });
    } catch (error) {
      this.logger.error('Error listing containers:', error.message);
      throw error;
    }
  }

  /**
   * Get container by ID or name
   */
  private getContainer(containerId: string): Docker.Container {
    return this.docker.getContainer(containerId);
  }

  /**
   * Start a container
   */
  async startContainer(containerId: string): Promise<any> {
    try {
      const container = this.getContainer(containerId);
      await container.start();
      this.logger.log(`Container ${containerId} started`);
      return { success: true, message: 'Container started successfully' };
    } catch (error) {
      this.logger.error(`Error starting container ${containerId}:`, error);
      throw error;
    }
  }

  /**
   * Stop a container
   */
  async stopContainer(containerId: string): Promise<any> {
    try {
      const container = this.getContainer(containerId);
      await container.stop();
      this.logger.log(`Container ${containerId} stopped`);
      return { success: true, message: 'Container stopped successfully' };
    } catch (error) {
      this.logger.error(`Error stopping container ${containerId}:`, error);
      throw error;
    }
  }

  /**
   * Restart a container
   */
  async restartContainer(containerId: string): Promise<any> {
    try {
      const container = this.getContainer(containerId);
      await container.restart();
      this.logger.log(`Container ${containerId} restarted`);
      return { success: true, message: 'Container restarted successfully' };
    } catch (error) {
      this.logger.error(`Error restarting container ${containerId}:`, error);
      throw error;
    }
  }

  /**
   * Remove a container
   * @param force - Force remove running container
   */
  async removeContainer(containerId: string, force: boolean = false): Promise<any> {
    try {
      const container = this.getContainer(containerId);
      await container.remove({ force });
      this.logger.log(`Container ${containerId} removed`);
      return { success: true, message: 'Container removed successfully' };
    } catch (error) {
      this.logger.error(`Error removing container ${containerId}:`, error);
      throw error;
    }
  }

  /**
   * Get container logs (last n lines)
   */
  async getContainerLogs(
    containerId: string,
    tail: number = 100,
  ): Promise<string> {
    try {
      const container = this.getContainer(containerId);
      const logs = await container.logs({
        stdout: true,
        stderr: true,
        tail,
        timestamps: true,
      });
      return logs.toString('utf-8');
    } catch (error) {
      this.logger.error(`Error getting logs for container ${containerId}:`, error);
      throw error;
    }
  }

  /**
   * Stream container logs (live)
   * Returns an Observable that emits log lines
   */
  streamContainerLogs(containerId: string): Observable<string> {
    return new Observable(subscriber => {
      const container = this.getContainer(containerId);

      container.logs(
        {
          follow: true,
          stdout: true,
          stderr: true,
          timestamps: true,
        },
        (err, stream) => {
          if (err) {
            subscriber.error(err);
            return;
          }

          stream.on('data', (chunk: Buffer) => {
            // Docker multiplexes stdout and stderr
            // First 8 bytes are header, rest is the actual log
            const logLine = chunk.toString('utf-8');
            subscriber.next(logLine);
          });

          stream.on('end', () => {
            subscriber.complete();
          });

          stream.on('error', (error) => {
            subscriber.error(error);
          });

          // Cleanup function
          return () => {
            stream.destroy();
          };
        },
      );
    });
  }

  /**
   * Get container inspect info
   */
  async inspectContainer(containerId: string): Promise<any> {
    try {
      const container = this.getContainer(containerId);
      const info = await container.inspect();
      return info;
    } catch (error) {
      this.logger.error(`Error inspecting container ${containerId}:`, error);
      throw error;
    }
  }

  /**
   * Get container stats (CPU, memory, etc.)
   */
  async getContainerStats(containerId: string): Promise<any> {
    try {
      const container = this.getContainer(containerId);
      const stats = await container.stats({ stream: false });
      return stats;
    } catch (error) {
      this.logger.error(`Error getting stats for container ${containerId}:`, error);
      throw error;
    }
  }
}