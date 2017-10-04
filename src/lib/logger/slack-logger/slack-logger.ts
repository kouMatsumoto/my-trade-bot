import axios from 'axios';
import { Logger } from '../logger.type';
import { joinMessages } from './internal-functions/internal-functions';


export class SlackLogger implements Logger {
  constructor(
    private webhookUrlLog: string,
    private webhookUrlInfo: string,
    private webhookUrlError: string,
  ) {}

  /**
   * send message to slack #log channel.
   */
  log(...messages: any[]): void {
    this.postToSlack(this.webhookUrlLog, messages);
  }

  /**
   * send message to slack #info channel.
   */
  info(...messages: any[]): void {
    this.postToSlack(this.webhookUrlInfo, messages);
  }

  /**
   * send message to slack #error channel.
   */
  error(...messages: any[]): void {
    this.postToSlack(this.webhookUrlError, messages);
  }

  private postToSlack(url: string, messages: any[]): void {
    const lastParam = messages[messages.length - 1];
    const useCallback = typeof lastParam === 'function';
    if (useCallback) {
      messages = messages.slice(0, messages.length - 1);
    }

    axios.post(url, { text: joinMessages(messages) })
      .then((res) => {
        if (useCallback) {
          lastParam(null, res);
        }
      })
      .catch((error) => {
        if (useCallback) {
          lastParam(error);
        }
      });
  }
}
