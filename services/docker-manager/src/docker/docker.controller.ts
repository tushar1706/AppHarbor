import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Query,
    Sse,
    HttpCode,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { DockerService } from './docker.service';
  import { Observable, map, interval } from 'rxjs';
  
  @Controller('docker')
  export class DockerController {
    private readonly logger = new Logger(DockerController.name);
    constructor(private readonly dockerService: DockerService) {}
  
    /**
     * GET /docker/containers
     * List all containers
     */
    @Get('containers')
async listContainers(@Query('all') all?: string) {
  this.logger.log(`Query param 'all': ${all}`);
  const includeAll = all !== 'false'; // Default to true
  this.logger.log(`includeAll: ${includeAll}`);
  return this.dockerService.listContainers(includeAll);
}

@Get('test')
async testDocker() {
  try {
    const docker = new (await import('dockerode')).default();
    const containers = await docker.listContainers({ all: true });
    return {
      count: containers.length,
      raw: containers
    };
  } catch (error) {
    return { error: error.message };
  }
}
  
    /**
     * GET /docker/containers/:id
     * Get container details
     */
    @Get('containers/:id')
    async inspectContainer(@Param('id') id: string) {
      return this.dockerService.inspectContainer(id);
    }
  
    /**
     * POST /docker/containers/:id/start
     * Start a container
     */
    @Post('containers/:id/start')
    @HttpCode(HttpStatus.OK)
    async startContainer(@Param('id') id: string) {
      return this.dockerService.startContainer(id);
    }
  
    /**
     * POST /docker/containers/:id/stop
     * Stop a container
     */
    @Post('containers/:id/stop')
    @HttpCode(HttpStatus.OK)
    async stopContainer(@Param('id') id: string) {
      return this.dockerService.stopContainer(id);
    }
  
    /**
     * POST /docker/containers/:id/restart
     * Restart a container
     */
    @Post('containers/:id/restart')
    @HttpCode(HttpStatus.OK)
    async restartContainer(@Param('id') id: string) {
      return this.dockerService.restartContainer(id);
    }
  
    /**
     * DELETE /docker/containers/:id
     * Remove a container
     */
    @Delete('containers/:id')
    async removeContainer(
      @Param('id') id: string,
      @Query('force') force?: string,
    ) {
      const forceRemove = force === 'true';
      return this.dockerService.removeContainer(id, forceRemove);
    }
  
    /**
     * GET /docker/containers/:id/logs
     * Get container logs (last n lines)
     */
    @Get('containers/:id/logs')
    async getContainerLogs(
      @Param('id') id: string,
      @Query('tail') tail?: string,
    ) {
      const tailLines = tail ? parseInt(tail, 10) : 100;
      const logs = await this.dockerService.getContainerLogs(id, tailLines);
      return { logs };
    }
  
    /**
     * GET /docker/containers/:id/logs/stream
     * Stream container logs (Server-Sent Events)
     */
    @Sse('containers/:id/logs/stream')
    streamContainerLogs(@Param('id') id: string): Observable<MessageEvent> {
      return this.dockerService.streamContainerLogs(id).pipe(
        map((log) => ({
          data: log,
        } as MessageEvent)),
      );
    }
  
    /**
     * GET /docker/containers/:id/stats
     * Get container stats
     */
    @Get('containers/:id/stats')
    async getContainerStats(@Param('id') id: string) {
      return this.dockerService.getContainerStats(id);
    }
  }