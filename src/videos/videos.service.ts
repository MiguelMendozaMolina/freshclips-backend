import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VideosService {
  private readonly videosPath = './videos'; // this is route from get videos

  // get all videos
  getallVideos() {
    const files = fs.readdirSync(this.videosPath);
    return files.map((file) => ({
      name: file,
      path: path.join(this.videosPath, file),
    }));
  }

  // get last video
  getLastVideo() {
    const files = fs.readdirSync(this.videosPath).map((fileName) => {
      const filePath = path.join(this.videosPath, fileName);
      return {
        name: fileName,
        path: filePath,
        time: fs.statSync(filePath).mtime.getTime(), //mtime es la fecha de modificacion
      };
    });

    const lastAddedVideo = files.sort((a, b) => b.time - a.time)[0];
    return lastAddedVideo;
  }

  // get specific video
  getVideoByName(videoName: string) {
    const videosPath = path.join(this.videosPath, videoName);
    if (!fs.existsSync(videosPath)) {
      throw new Error('Video does not exist');
    }
    return fs.createReadStream(videosPath);
  }
}
