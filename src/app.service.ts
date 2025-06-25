import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getVersion(): { version: string; message: string; uptime: number } {
    return {
      version: '1.0.0',
      message: 'Hello World!',
      uptime: process.uptime(),
    };
  }
}
