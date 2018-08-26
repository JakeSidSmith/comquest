import { AnyAction } from 'redux';
import { ComquestSuccessAction, RequestActionTypes, RequestData } from './types';

const handleSuccess = <Data>(
  state: RequestData<Data>,
  action: ComquestSuccessAction<Data>
): RequestData<Data> => {
  return {
    ...state,
    data: action.payload,
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
      case actions.SUCCESS:
        return handleSuccess<Data>(state, action as ComquestSuccessAction<Data>);
      default:
        return state;
    }
  };
};
