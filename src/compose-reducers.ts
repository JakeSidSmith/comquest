import { AnyAction } from 'redux';

export function composeReducers<
  S1 extends {},
  S2 extends {},
  S3 extends {},
  S4 extends {},
  S5 extends {},
  R extends S1 & S2 & S3 & S4 & S5
>(
  reducer1: (state: S1, action: AnyAction) => S1,
  reducer2: (state: S2, action: AnyAction) => S2,
  reducer3?: (state: S3, action: AnyAction) => S3,
  reducer4?: (state: S4, action: AnyAction) => S4,
  reducer5?: (state: S5, action: AnyAction) => S5
) {
  return (state: R, action: AnyAction): R => {
    return Object.assign(
      {},
      reducer1(state, action),
      reducer2(state, action),
      typeof reducer3 === 'function' ? reducer3(state, action) : undefined,
      typeof reducer4 === 'function' ? reducer4(state, action) : undefined,
      typeof reducer5 === 'function' ? reducer5(state, action) : undefined
    );
  };
}
