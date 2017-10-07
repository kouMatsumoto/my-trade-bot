import { BitbankApiHandler, BitbankApiOrderOptions } from './trade-tools/bitbank/api-handler/api-handler';
import { ENV } from './config/environments';


const api = new BitbankApiHandler({
  apiKey: ENV.apiKey,
  apiSecret: ENV.apiSecret,
});


console.log(ENV);

const options: BitbankApiOrderOptions = {
  pair: 'btc_jpy',
  amount: 0.001,
  price: 48000,
  side: 'buy',
  type: 'limit',
};

api.createOrder(options).subscribe(
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
