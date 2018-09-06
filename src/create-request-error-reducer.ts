import { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import {
  ComquestFailureAction,
  RequestActionTypes,
  RequestError,
} from './types';

function handleFailure<E = AxiosError>(
  _state: RequestError<E>,
  action: ComquestFailureAction<any>
): RequestError<E> {
  return {
    error: action.payload,
  };
}

export function createRequestErrorReducer<E = AxiosError>(
  actionTypes: RequestActionTypes
) {
  return (state: RequestError<E> = {}, action: AnyAction): RequestError<E> => {
    switch (action.type) {
      case actionTypes.FAILURE:
        return handleFailure(state, action as ComquestFailureAction<any>);
      default:
        return state;
    }
  };
}
