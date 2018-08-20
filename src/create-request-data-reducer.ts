import { AnyAction } from 'redux';
import { ComquestSuccessAction, RequestActionTypes, RequestData } from './types';

const handleRequest = <Data>(
  state: RequestData<Data>
): RequestData<Data> => {
  return {
    ...state,
  };
};

const handleSuccess = <Data>(
  state: RequestData<Data>,
  action: ComquestSuccessAction<Data>
): RequestData<Data> => {
  return {
    ...state,
    data: action.payload,
  };
};

const handleFailure = <Data>(
  state: RequestData<Data>
): RequestData<Data> => {

  return {
    ...state,
    data: undefined,
  };
};

export const createRequestDataReducer = <Data>(
  actions: RequestActionTypes
) => {
  return (
    state: RequestData<Data> = {},
    action: AnyAction
  ): RequestData<Data> => {
    switch (action.type) {
      case actions.REQUEST:
        return handleRequest<Data>(state);
      case actions.SUCCESS:
        return handleSuccess<Data>(state, action as ComquestSuccessAction<Data>);
      case actions.FAILURE:
        return handleFailure<Data>(state);
      default:
        return state;
    }
  };
};