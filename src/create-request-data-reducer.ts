import { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import {
  ComquestSuccessAction,
  RequestActionTypes,
  RequestData,
} from './types';

function handleSuccess<D = AxiosResponse>(
  _state: RequestData<D>,
  action: ComquestSuccessAction<D>
): RequestData<D> {
  return {
    data: action.payload,
  };
}

export function createRequestDataReducer<D = AxiosResponse>(
  actionTypes: RequestActionTypes
) {
  return (state: RequestData<D> = {}, action: AnyAction): RequestData<D> => {
    switch (action.type) {
      case actionTypes.SUCCESS:
        return handleSuccess<D>(state, action as ComquestSuccessAction<D>);
      default:
        return state;
    }
  };
}
