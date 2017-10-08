import { BitbankApiHandler, BitbankApiOrderOptions } from './trade-tools/bitbank/api-handler/api-handler';
import { ENV } from './config/environments';
import { filter, map, mergeMap, tap } from 'rxjs/operators';


const api = new BitbankApiHandler({
  apiKey: ENV.apiKey,
  apiSecret: ENV.apiSecret,
});


// cancelAll();

api.getWithdrawAccount('btc')
  .subscribe((data) => {
    console.log(data);
  });



function getOrder() {
  api.getOrder('btc_jpy', '302603751')
    .subscribe((data) => {
      console.log(data);
    });
}

function cancelOrder() {
  api.cancelOrders('btc_jpy', ['302661974', '302662011', '302662012', '302662013', ])
    .subscribe((data) => {
      console.log(data);
    });
}

function getActiveOrderIds() {
  api.getActiveOrders('btc_jpy').pipe(
    map(data => data.orders),
    map(orders => orders.map((data) => data.order_id))
  )
  .subscribe((data) => {
    console.log(data);
  });
}

function cancelAll() {
  const pair = 'btc_jpy';
  api.getActiveOrders(pair).pipe(
    map(data => data.orders.map(order => order.order_id)),
    filter(ids => 0 < ids.length),
    mergeMap(ids => api.cancelOrders(pair, ids)),
  )
  .subscribe(
    (data) => {
      console.log(data);
    },
    () => {},
    () => { console.log('complete'); },
  );
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
