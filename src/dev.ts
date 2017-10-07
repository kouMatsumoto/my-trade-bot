import { BitbankApiHandler } from './trade-tools/bitbank/api-handler/api-handler';
import { ENV } from './config/environments';


const api = new BitbankApiHandler({
  apiKey: ENV.apiKey,
  apiSecret: ENV.apiSecret,
});


console.log(ENV);

api.getUserAssets().subscribe(
  (data) => {
    console.log('data', data);
  },
  (error) => {
    console.error('error', error);
  },
  () => {
    console.log('complete');
  }
);


// prevent from exit process.
setInterval(() => {}, Number.POSITIVE_INFINITY);
