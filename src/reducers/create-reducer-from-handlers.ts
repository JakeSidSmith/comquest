import { AnyAction } from 'redux';

import { ActionHandlers, HandlersReducer } from '../types';

export const createReducerFromHandlers = <S, A extends AnyAction>(
  handlers: ActionHandlers<S>,
  initialState: S
): HandlersReducer<S, A> => (
  state: S | undefined = initialState,
  action: A
): S => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};
