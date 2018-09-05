import { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import {
  ComquestSuccessAction,
  RequestActionTypes,
  RequestData,
} from './types';

function handleSuccess<Data>(
  _state: RequestData<AxiosResponse<Data>>,
  action: ComquestSuccessAction<Data>
): RequestData<AxiosResponse<Data>> {
  return {
    data: action.payload,
  };
}

export function createRequestDataReducer<Data>(
  actionTypes: RequestActionTypes
) {
  return (
    state: RequestData<AxiosResponse<Data>> = {},
    action: AnyAction
  ): RequestData<AxiosResponse<Data>> => {
    switch (action.type) {
      case actionTypes.SUCCESS:
        return handleSuccess<Data>(state, action as ComquestSuccessAction<
          Data
        >);
      default:
        return state;
    }
  };
}
