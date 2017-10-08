import { BitbankApiHandler, BitbankApiOrderOptions } from './trade-tools/bitbank/api-handler/api-handler';
import { ENV } from './config/environments';


const api = new BitbankApiHandler({
  apiKey: ENV.apiKey,
  apiSecret: ENV.apiSecret,
});


getActiveOrders();




function getOrder() {
  api.getOrder('btc_jpy', '302603751')
    .subscribe((data) => {
      console.log(data);
    });
}

function getActiveOrders() {
  api.getActiveOrders('xrp_jpy')
    .subscribe((data) => {
      console.log(data);
    });
}

function createOrder() {
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
}


// prevent from exit process.
setInterval(() => {}, Number.POSITIVE_INFINITY);
