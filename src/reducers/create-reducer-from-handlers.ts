import { AnyAction } from 'redux';

import { ActionHandlers } from '../types';

export const createReducerFromHandlers = <S>(
  handlers: ActionHandlers<S>,
  initialState: S
) => (state: S = initialState, action: AnyAction): S => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};
