import { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import {
  ComquestActionTypes,
  ComquestRequestData,
  ComquestSuccessAction,
} from './types';

function handleSuccess<D = AxiosResponse>(
  _state: ComquestRequestData<D>,
  action: ComquestSuccessAction<D>
): ComquestRequestData<D> {
  return {
    data: action.payload,
  };
}

export function createComquestRequestDataReducer<D = AxiosResponse>(
  actionTypes: ComquestActionTypes
) {
  return (
    state: ComquestRequestData<D> = {},
    action: AnyAction
  ): ComquestRequestData<D> => {
    switch (action.type) {
      case actionTypes.SUCCESS:
        return handleSuccess<D>(state, action as ComquestSuccessAction<D>);
      default:
        return state;
    }
  };
}
