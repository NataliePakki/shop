
import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {

  const pipe = new OrderByPipe();
  const firstItem = {name: 'A'};
  const secondItem = {name: 'B'};
  const thirdItem = {name: 'C'};
  const values = [
    secondItem, thirdItem, firstItem
  ];

  it('transforms order by name desc', () => {
    expect(pipe.transform(values, 'name', false)).toEqual([firstItem, secondItem, thirdItem]);
  });

  it('transforms order by name asc"', () => {
    expect(pipe.transform(values, 'name', true)).toEqual([ thirdItem, secondItem, firstItem]);
  });
});
