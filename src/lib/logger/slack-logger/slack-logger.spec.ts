import * as expect from 'expect';
import { AxiosResponse } from 'axios';
import { SlackLogger } from './slack-logger';
import { ENV } from '../../../config/environments';


/**
 * This test create real slack posts so skip default.
 * Disable skip if test this.
 */
describe.skip('SlackLogger', () => {
  let slackLogger: SlackLogger;
  before(() => {
    slackLogger = new SlackLogger(ENV.slackWebhookUrlLog, ENV.slackWebhookUrlInfo, ENV.slackWebhookUrlError);
  });

  it('should send message properly #log (no callback)', (done) => {
    slackLogger.log('SlackLogger Test Start');
    expect(null).toBe(null);
    done();
  });

  it('should send message properly #log', (done) => {
    slackLogger.log('SlackLogger Test #log', (error: any, res: AxiosResponse) => {
      expect(error).toBe(null);
      expect(res.status).toBe(200);
      done();
    });
  });

  it('should send message properly #info', (done) => {
    slackLogger.info('SlackLogger Test #info', (error: any, res: AxiosResponse) => {
      expect(error).toBe(null);
      expect(res.status).toBe(200);
      done();
    });
  });

  it('should send message properly #error', (done) => {
    slackLogger.error('SlackLogger Test #error', (error: any, res: AxiosResponse) => {
      expect(error).toBe(null);
      expect(res.status).toBe(200);
      done();
    });
  });
});
