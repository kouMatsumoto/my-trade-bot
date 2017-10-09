import * as expect from 'expect';
import { _stringify, joinMessages } from './internal-functions';


describe('_stringify', () => {
  it('should stringify string', () => {
    expect(_stringify('test')).toBe('test');
  });

  it('should stringify number', () => {
    expect(_stringify(100)).toBe('100');
  });

  it('should stringify boolean', () => {
    expect(_stringify(true)).toBe('true');
  });

  it('should stringify null', () => {
    expect(_stringify(null)).toBe('null');
  });

  it('should stringify undefined', () => {
    expect(_stringify(void 0)).toBe('undefined');
  });

  it('should stringify Error object', () => {
    expect(_stringify(new Error('error-message'))).toBe('`error-message`');
  });

  it('should stringify object', () => {
    expect(_stringify({})).toBe('```{}```');
    expect(_stringify({a: 'test'})).toBe('```{\n  "a": "test"\n}```');
  });

  it('should stringify array', () => {
    expect(_stringify(['test', 'test2'])).toBe('```[\n  "test",\n  "test2"\n]```');
  });
});


describe('joinMessages', () => {
  it('should join messages properly', () => {
    expect(joinMessages('a', { b: '2' })).toBe('a\n```{\n  "b": "2"\n}```');
  });

  it('should flatten messages', () => {
    expect(joinMessages(['a', ['test'], 0])).toBe('a\n```[\n  "test"\n]```\n0');
  });
});
