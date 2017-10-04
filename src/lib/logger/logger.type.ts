/**
 * Common interface for console-logger and slack-logger.
 */
export interface Logger {
  log(...messages: any[]): void;
  info(...messages: any[]): void;
  error(...messages: any[]): void;
}
