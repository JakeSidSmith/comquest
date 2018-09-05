import { AnyAction } from 'redux';

interface StringKeyedObject {
  [i: string]: any;
}

export function composeReducers<
  S1 extends StringKeyedObject,
  S2 extends StringKeyedObject,
  S3 extends StringKeyedObject,
  S4 extends StringKeyedObject,
  S5 extends StringKeyedObject,
  R extends S1 & S2 & S3 & S4 & S5
>(
  reducer1: (state: S1 | undefined, action: AnyAction) => S1,
  reducer2: (state: S2 | undefined, action: AnyAction) => S2,
  reducer3?: (state: S3 | undefined, action: AnyAction) => S3,
  reducer4?: (state: S4 | undefined, action: AnyAction) => S4,
  reducer5?: (state: S5 | undefined, action: AnyAction) => S5
) {
  return (state: R | undefined, action: AnyAction): R => {
    const newStates = [
      reducer1(state, action),
      reducer2(state, action),
      typeof reducer3 === 'function' ? reducer3(state, action) : undefined,
      typeof reducer4 === 'function' ? reducer4(state, action) : undefined,
      typeof reducer5 === 'function' ? reducer5(state, action) : undefined,
    ];

    if (typeof state === 'undefined') {
      return Object.assign({}, ...newStates);
    }

    if (
      (newStates[0] === state || typeof newStates[0] === 'undefined') &&
      (newStates[1] === state || typeof newStates[1] === 'undefined') &&
      (newStates[2] === state || typeof newStates[2] === 'undefined') &&
      (newStates[3] === state || typeof newStates[3] === 'undefined') &&
      (newStates[4] === state || typeof newStates[4] === 'undefined')
    ) {
      return state;
    }

    const newState: R = Object.assign({}, state);

    newStates.forEach(subState => {
      if (typeof subState !== 'undefined') {
        Object.keys(subState).forEach(key => {
          if (subState[key] !== state[key]) {
            newState[key] = subState[key];
          }
        });
      }
    });

    return newState;
  };
}
