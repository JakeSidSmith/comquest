import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from '../node_modules/redux-thunk';

export interface RequestActionTypes {
  REQUEST: symbol;
  SUCCESS: symbol;
  FAILURE: symbol;
  CLEAR_DATA: symbol;
  CLEAR_ERRORS: symbol;
  RESET_STATE: symbol;
}

export interface Params {
  [i: string]: string | number;
}

export type RequestOptions = Partial<{
  params: Params;
  doNotSendIfExistingRequests: boolean;
  sendAfterExistingRequests: boolean;
  abortExistingRequestsOnRequest: boolean;
  abortExistingRequestsOnSuccess: boolean;
  abortExistingRequestsOnFailure: boolean;
  clearDataOnRequest: boolean;
  clearDataOnSuccess: boolean;
  clearDataOnFailure: boolean;
  clearErrorsOnRequest: boolean;
  clearErrorsOnSuccess: boolean;
  clearErrorsOnFailure: boolean;
  resetStateOnRequest: boolean;
  resetStateOnSuccess: boolean;
  resetStateOnFailure: boolean;
}>;

export interface ComquestAction<Data, Errors> extends AnyAction {
  type: symbol;
  payload?: AxiosResponse<Data> | Errors;
  options: RequestOptions;
}

export interface ComquestSuccessAction<Data>
  extends ComquestAction<Data, never> {
  payload: AxiosResponse<Data>;
}

export interface ComquestFailureAction<Errors>
  extends ComquestAction<never, Errors> {
  payload: Errors;
}

export interface RequestState {
  loading: boolean;
  requestCount: number;
  successCount: number;
  failureCount: number;
  completeCount: number;
  inFlightCount: number;
}

export interface RequestData<Data> {
  data?: Data;
}

export interface RequestErrors<Errors> {
  errors?: Errors;
}

export type RequestActionCreatorCreator<StoreState, Data, Errors> = (
  actionTypes: RequestActionTypes,
  config: AxiosRequestConfig,
  options?: RequestOptions
) => RequestActionCreator<StoreState, Data, Errors>;

export type RequestActionCreator<StoreState, Data, Errors> = (
  configOverrides?: AxiosRequestConfig,
  optionsOverrides?: RequestOptions
) => RequestAction<StoreState, Data, Errors>;

export type RequestAction<StoreState, Data, Errors> = (
  dispatch:
    | ThunkDispatch<StoreState, any, ComquestAction<Data, Errors>>
    | Dispatch<ComquestAction<Data, Errors>>,
  getState?: () => StoreState,
  extra?: any
) => RequestActionReturnValue<Data, Errors>;

export type RequestActionReturnValue<Data, Errors> = Promise<
  AxiosResponse<Data> | Errors
>;
