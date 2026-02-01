import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DockerController } from './docker/docker.controller';
import { DockerService } from './docker/docker.service';
import { DockerModule } from './docker/docker.module';

@Module({
  imports: [DockerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}