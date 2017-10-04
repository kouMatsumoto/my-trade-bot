import { Observable } from 'rxjs/Observable';
import {
  ActiveOrder, Balance, CreateLimitOrderResult, MarketHistory, Orderbooks, Ticker,
} from './standardized-api-data.type';


/**
 * interface to standardize api-handler classes.
 *
 * all standardized api-handler exported from `./index` should implement this.
 */
export interface StandardizedApi {
  fetchTicker(market: string): Observable<Ticker>;
  fetchOrderbooks(market: string): Observable<Orderbooks>;
  fetchMarketHistory(market: string): Observable<MarketHistory[]>;
  fetchBalance(currency: string): Observable<Balance>;
  fetchBalances(): Observable<Balance[]>;
  createLimitOrder(market: string, type: 'buy'|'sell', rate: number, amount: number): Observable<CreateLimitOrderResult>;
  fetchActiveOrder(id: string): Observable<ActiveOrder>;
  cancelOrder(id: string): Observable<null>;
}
