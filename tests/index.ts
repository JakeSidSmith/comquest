import { foo } from '../src';

describe('index.ts', () => {

  it('exports foo bar', () => {
    expect(foo).toBe('bar');
  });

});
