import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { StandardizedApi } from '../../common/api-handler/standardized-api-handler.type';
import {
  ActiveOrder, Balance, CreateLimitOrderResult, MarketHistory, Orderbooks, Ticker,
} from '../../common/api-handler/standardized-api-data.type';


export class TestingApiHandler implements StandardizedApi {
  private fetchTickerCount = 0;
  private fetchOrderbooksCount = 0;
  private fetchMarketHistoryCount = 0;
  private createLimitOrderCount = 0;
  private fetchActiveOrderCount = 0;

  // created by createLimitOrder, and updated by updateOrderStatus.
  private activeOrder: ActiveOrder|null = null;


  fetchTicker(_market: string): Observable<Ticker> {
    this.fetchTickerCount++;
    return Observable.of({
      ask: this.fetchTickerCount,
      bid: this.fetchTickerCount,
      last: this.fetchTickerCount,
      fetchedAt: '',
    })
      .delay(30);
  }

  fetchOrderbooks(_market: string): Observable<Orderbooks> {
    this.fetchOrderbooksCount++;
    const orderbook = {
      quantity: this.fetchOrderbooksCount,
      rate: this.fetchOrderbooksCount,
      fetchedAt: '',
    };
    const bids = [];
    const asks = [];
    for (let i = 0; i < 10; i++) {
      bids.push({ ...orderbook });
      asks.push({ ...orderbook });
    }

    return Observable.of({ bids, asks })
      .delay(30);
  }

  fetchMarketHistory(_market?: string): Observable<MarketHistory[]> {
    this.fetchMarketHistoryCount++;
    const data = {
      id: this.fetchMarketHistoryCount,
      timestamp: moment().subtract(this.fetchMarketHistoryCount, 'seconds').format('YYYY-MM-DDTHH:mm:ss.SSS'),
      quantity: this.fetchMarketHistoryCount,
      price: this.fetchMarketHistoryCount,
      total: this.fetchMarketHistoryCount,
      fillType: 'PARTIAL_FILL',
      orderType: 'SELL',
    };

    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push(<MarketHistory>{ ...data });
    }

    return Observable.of(array)
      .delay(30);
  }

  fetchBalance(currency: string): Observable<Balance> {
    return Observable.of({
      currency: currency,
      amount: 2,
      available: 1,
      pending: 1,
      cryptoAddress: '',
      requested: false,
    })
      .delay(30);
  }

  fetchBalances(): Observable<Balance[]> {
    const balance1 = {
      currency: 'currency1',
      amount: 2,
      available: 1,
      pending: 1,
      cryptoAddress: '',
      requested: false,
    };
    const balance2 = {
      currency: 'currency2',
      amount: 2,
      available: 1,
      pending: 1,
      cryptoAddress: '',
      requested: false,
    };
    const balance3 = {
      currency: 'currency3',
      amount: 2,
      available: 1,
      pending: 1,
      cryptoAddress: '',
      requested: false,
    };
    return Observable.of([balance1, balance2, balance3])
      .delay(30);
  }

  createLimitOrder(market: string, type: 'sell'|'buy', rate: number, amount: number): Observable<CreateLimitOrderResult> {
    this.createLimitOrderCount++;
    const id = '' + this.createLimitOrderCount;
    this.activeOrder = {
      id,
      market,
      type,
      rate,
      amount,
      actualRate: null,
      amountRemaining: amount,
      fetchedAt: '',
    };
    return Observable.of({ id })
      .delay(30);
  }

  cancelOrder(_id: string): Observable<null> {
    return Observable.of(null)
      .delay(30);
  }

  fetchActiveOrder(_id: string): Observable<ActiveOrder> {
    if (this.activeOrder === null) {
      throw new Error('Active Order is null');
    }

    this.fetchActiveOrderCount++;
    return Observable.of(this.activeOrder)
      .delay(30);
  }

  /**
   * Special method to update order status
   */
  updateOrderStatus(data: {[key: string]: any}): void {
    this.activeOrder = Object.assign({}, this.activeOrder, data);
  }
}
