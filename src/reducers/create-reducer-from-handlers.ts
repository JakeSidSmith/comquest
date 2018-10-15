import { AnyAction } from 'redux';

import { ActionHandlers } from '../types';

export const createReducerFromHandlers = <S, A extends AnyAction>(
  handlers: ActionHandlers<S>,
  initialState: S
) => (state: S = initialState, action: A): S => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};
