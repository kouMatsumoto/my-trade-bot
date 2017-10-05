
import { BitbankPubnubHandler } from './trade-tools/bitbank/pubnub-handler/pubnub-handler';


const pubnubHandler = new BitbankPubnubHandler();
pubnubHandler.getTicker$('btc_jpy')
  .subscribe((data) => {
    console.log(data);
  });

pubnubHandler.getTicker$('xrp_jpy')
  .subscribe((data) => {
    console.log(data);
  });


// prevent from exit process.
setInterval(() => {}, Number.POSITIVE_INFINITY);
