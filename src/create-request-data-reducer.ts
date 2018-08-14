import { AnyAction } from 'redux';
import { ComquestAction, RequestActionTypes, RequestData } from './types';

export const createRequestDataReducer = <Data>(
  actions: RequestActionTypes
) => {
  const handleRequest = (state: RequestData<Data>): RequestData<Data> => {
    return {
      ...state,
    };
  };

  const handleSuccess = (
    state: RequestData<Data>,
    action: ComquestAction<Data>
  ): RequestData<Data> => {
    return {
      ...state,
      data: action.payload as Data,
    };
  };

  const handleFailure = (
    state: RequestData<Data>
  ): RequestData<Data> => {

    return {
      ...state,
      data: undefined,
    };
  };

  return (
    state: RequestData<Data> = {},
    action: AnyAction
  ): RequestData<Data> => {
    switch (action.type) {
      case actions.REQUEST:
        return handleRequest(state);
      case actions.SUCCESS:
        return handleSuccess(state, action as ComquestAction<Data>);
      case actions.FAILURE:
        return handleFailure(state);
      default:
        return state;
    }
  };
};
