import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map } from 'rxjs';

interface IMessageEvent {
  data: string | object;
}

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('event')
  sendEvent(): Observable<IMessageEvent> {
    return interval(1000).pipe(
      map(
        (num: number) => ({ data: 'Hello ' + num })
      )
    )
  }
}
