import { Logger } from './logger.type';
import { ENV } from '../../config/environments';
import { SlackLogger } from './slack-logger/slack-logger';
import { ConsoleLogger } from './console-logger/console-logger';

let logger: Logger;

if (ENV.production) {
  logger = new SlackLogger(ENV.slackWebhookUrlLog, ENV.slackWebhookUrlInfo, ENV.slackWebhookUrlError);
} else {
  logger = new ConsoleLogger();
}

export default logger;
