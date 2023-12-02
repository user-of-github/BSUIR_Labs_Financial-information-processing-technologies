import { getMonthlyPayment } from '../core/utils';
import { isNear } from './utils';

describe('Core utilities test', () => {
  test('Credit calculator tests', () => {
    /* test from:  https://journal.tinkoff.ru/guide/credit-payment/ */
    const sum = 300000;
    const percantage = 15;
    const years = 18 / 12;

    const expected = 18715.44;

    const monthlyPayment = getMonthlyPayment(sum, years, percantage);

    expect(isNear(monthlyPayment, expected, 0.1)).toBeTruthy();
  });
});
