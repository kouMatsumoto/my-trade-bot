/**
 * Environment variables are configured in .env file
 * @see: https://github.com/motdotla/dotenv
 */

require('dotenv').config();

// env variable declarations.
const production = process.env.NODE_ENV === 'production' || process.env.PRODUCTION === 'true' || false;
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY || '';
const apiSecret = process.env.API_SECRET || '';
const slackWebhookUrlLog = process.env.SLACK_WEBHOOK_URL_LOG || '';
const slackWebhookUrlInfo = process.env.SLACK_WEBHOOK_URL_INFO || '';
const slackWebhookUrlError = process.env.SLACK_WEBHOOK_URL_ERROR || '';


export const ENV = {
  production,
  port,
  apiKey,
  apiSecret,
  slackWebhookUrlLog,
  slackWebhookUrlInfo,
  slackWebhookUrlError,
};
