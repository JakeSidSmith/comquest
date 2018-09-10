import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import {
  ComquestActionTypes,
  ComquestFailureAction,
  ComquestRequestError,
} from './types';

function handleFailure<E = AxiosError>(
  _state: ComquestRequestError<E>,
  action: ComquestFailureAction<E>
): ComquestRequestError<E> {
  return {
    error: action.payload,
  };
}

export function createComquestErrorReducer<E = AxiosError>(
  actionTypes: ComquestActionTypes
) {
  return (
    state: ComquestRequestError<E> = {},
    action: AnyAction
  ): ComquestRequestError<E> => {
    switch (action.type) {
      case actionTypes.FAILURE:
        return handleFailure(state, action as ComquestFailureAction<E>);
      default:
        return state;
    }
  };
}
