import { Logger } from '../logger.type';


export class ConsoleLogger implements Logger {
  log(...messages: any[]): void {
    console.log(...messages);
  }

  info(...messages: any[]): void {
    console.info(...messages);
  }

  error(...messages: any[]): void {
    console.error(...messages);
  }
}
