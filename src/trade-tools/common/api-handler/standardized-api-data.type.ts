export interface Ticker {
  readonly ask: number|null;
  readonly bid: number|null;
  readonly last: number|null;
  readonly fetchedAt: string;
}

export interface Orderbooks {
  readonly bids: Orderbook[];
  readonly asks: Orderbook[];
}

export interface Orderbook {
  readonly quantity: number;
  readonly rate: number;
  readonly fetchedAt: string;
}

/**
 * Todo.
 * except bittrex, other api-handler don't have total, fillType fields.
 */
export interface MarketHistory {
  id: number;
  timestamp: string; // utc.
  quantity: number;
  price: number;
  total: number;
  fillType: 'FILL' | 'PARTIAL_FILL';
  orderType: 'SELL' | 'BUY';
  fetchedAt: string;
}

export interface Balance {
  currency: string;
  amount: number;
  available: number;
  pending: number;
  cryptoAddress?: string;
  requested?: boolean;
}

export interface CreateLimitOrderResult {
  id: string;
}

export interface ActiveOrder {
  id: string;
  market: string;
  type: 'buy' | 'sell';
  rate: number;
  actualRate: number|null;
  amount: number;
  amountRemaining: number;
  fetchedAt: string;
}
