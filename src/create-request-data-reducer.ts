import { AnyAction } from 'redux';
import {
  ComquestSuccessAction,
  RequestActionTypes,
  RequestData,
} from './types';

function handleSuccess<Data>(
  state: RequestData<Data>,
  action: ComquestSuccessAction<Data>
): RequestData<Data> {
  return {
    data: action.payload,
  };
}

export function createRequestDataReducer<Data>(
  actionTypes: RequestActionTypes
) {
  return (
    state: RequestData<Data> = {},
    action: AnyAction
  ): RequestData<Data> => {
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
