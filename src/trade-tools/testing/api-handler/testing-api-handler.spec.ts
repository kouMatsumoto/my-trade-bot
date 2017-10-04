import * as expect from 'expect';
import { TestingApiHandler } from './testing-api-hander';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { ActiveOrder } from '../../common/api-handler/standardized-api-data.type';


describe('TestingApiHandler', () => {
  let api: TestingApiHandler;
  beforeEach(() => {
    api = new TestingApiHandler();
  });

  describe('#fetchTicker', () => {
    it('should return first value as 1', (done) => {
      api.fetchTicker('')
        .map(ticker => ticker.ask)
        .subscribe((ask) => {
        expect(ask).toBe(1);
        done();
      });
    });

    it('should increment return value by call', (done) => {
      let count = 0;
      Observable.range(1, 5)
        .concatMap(() => api.fetchTicker(''))
        .map(ticker => ticker.ask)
        .subscribe(
          (ask) => {
            count++;
            expect(ask).toBe(count);
          },
          () => {},
          () => done(),
        );
    });
  });

  describe('#fetchOrderbooks', () => {
    it('should return first value as 1', (done) => {
      api.fetchOrderbooks('')
        .map(data => data.bids[0])
        .subscribe((bid) => {
          expect(bid).toEqual({ quantity: 1, rate: 1, fetchedAt: '' });
          done();
        });
    });

    it('should increment return value by call', (done) => {
      let count = 0;
      Observable.range(1, 5)
        .concatMap(() => api.fetchOrderbooks(''))
        .map(data => data.asks[0].quantity)
        .subscribe(
          (quantity) => {
            count++;
            expect(quantity).toBe(count);
          },
          () => {},
          () => done(),
        );
    });
  });

  describe('#fetchMarketHistory', () => {
    it('should return first value as 1', (done) => {
      api.fetchMarketHistory()
        .map(array => array[0])
        .map(data => data.id)
        .subscribe((id) => {
          expect(id).toBe(1);
          done();
        });
    });

    it('should increment return value by call', (done) => {
      let count = 0;
      Observable.range(1, 5)
        .concatMap(() => api.fetchMarketHistory())
        .map(array => array[0])
        .map(data => data.id)
        .subscribe(
          (id) => {
            count++;
            expect(id).toBe(count);
          },
          () => {},
          () => done(),
        );
    });
  });

  describe('#fetchBalance', () => {
    it('should return data as of inputted currency #BTC', (done) => {
      api.fetchBalance('BTC')
        .subscribe((data) => {
          expect(data.currency).toBe('BTC');
          done();
        });
    });

    it('should return data as of inputted currency #LTC', (done) => {
      api.fetchBalance('LTC')
        .subscribe((data) => {
          expect(data.currency).toBe('LTC');
          done();
        });
    });
  });

  describe('#fetchBalances', () => {
    it('should return data expected', (done) => {
      api.fetchBalances()
        .subscribe((array) => {
          expect(array.length).toBe(3);
          expect(array[0].currency).toBe('currency1');
          expect(array[1].currency).toBe('currency2');
          expect(array[2].currency).toBe('currency3');
          done();
        });
    });
  });

  describe('#createLimitOrder', () => {
    it('should return first value as 1', (done) => {
      api.createLimitOrder('', 'buy', 1, 1)
        .map(result => result.id)
        .subscribe((id) => {
          expect(id).toBe('1');
          done();
        });
    });

    it('should increment return value by call', (done) => {
      let count = 0;
      Observable.range(1, 5)
        .concatMap(() => api.createLimitOrder('', 'buy', 1, 1))
        .map(result => result.id)
        .subscribe(
          (id) => {
            count++;
            expect(id).toBe('' + count);
          },
          () => {},
          () => done(),
        );
    });
  });

  describe('#fetchActiveOrder', () => {
    beforeEach(() => {
      api.createLimitOrder('USDT-BTC', 'buy', 3700, 1);
    });

    it('should fetch data same as created', (done) => {
      api.fetchActiveOrder('')
        .subscribe((order) => {
          expect(order).toEqual({
            id: '1',
            market: 'USDT-BTC',
            type: 'buy',
            rate: 3700,
            actualRate: null,
            amount: 1,
            amountRemaining: 1,
            fetchedAt: '',
          });
          done();
        });
    });

    it('should update with expected value', (done) => {
      const expected: ActiveOrder = {
        id: '1',
        market: 'USDT-BTC',
        type: 'buy',
        rate: 3700,
        actualRate: null,
        amount: 1,
        amountRemaining: 0.5,
        fetchedAt: '',
      };
      api.updateOrderStatus(expected);
      api.fetchActiveOrder('')
        .subscribe((order) => {
          expect(order).toEqual(expected);
          done();
        });
    });
  });

  describe('#cancelOrder', () => {
    it('should return null', (done) => {
      api.cancelOrder('')
        .subscribe((n) => {
          expect(n).toBe(null);
          done();
        });
    });
  });
});
