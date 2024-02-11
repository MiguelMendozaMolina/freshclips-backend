import { Controller, Get, Param, Res } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Response } from 'express';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  getAllVideos() {
    return this.videosService.getallVideos();
  }

  @Get('last')
  getLastVideo(@Res() res: Response){
    const video = this.videosService.getLastVideo();
    const stream = this.videosService.getVideoByName(video.name);
    stream.pipe(res);
  }

  @Get(':name')
  getVideoByName(@Param('name') name: string, @Res() res: Response){
    const stream = this.videosService.getVideoByName(name);
    stream.pipe(res);
  }
}
