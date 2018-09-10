import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface StringIndexedObject {
  [i: string]: any;
}

export interface ComquestActionTypes {
  REQUEST: symbol;
  SUCCESS: symbol;
  FAILURE: symbol;
  CLEAR_DATA: symbol;
  CLEAR_ERRORS: symbol;
  RESET_STATE: symbol;
  CANCEL_REQUESTS: symbol;
}

export interface Params {
  [i: string]: string | number;
}

export type ComquestOptions = Partial<{
  params: Params;
  // doNotSendIfExistingRequests: boolean;
  // sendAfterExistingRequests: boolean;
  throwErrors: boolean;
  suppressCancelErrors: boolean;
  abortRequestsOnRequest: boolean;
  abortRequestsOnSuccess: boolean;
  abortRequestsOnFailure: boolean;
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

export interface ComquestAction<D = AxiosResponse, E = AxiosError>
  extends AnyAction {
  type: symbol;
  payload?: D | E;
  error?: boolean;
  meta: {
    comquest: symbol;
    type: symbol;
    cancelTokenSource?: CancelTokenSource;
    url?: string;
    options?: ComquestOptions;
    config?: AxiosRequestConfig;
  };
}

export interface ComquestSuccessAction<D = AxiosResponse>
  extends ComquestAction<D, undefined> {
  payload: D;
}

export interface ComquestFailureAction<E = AxiosError>
  extends ComquestAction<undefined, E> {
  payload: E;
}

export interface ComquestRequestState {
  loading: boolean;
  requestCount: number;
  successCount: number;
  failureCount: number;
  completeCount: number;
  inFlightCount: number;
}

export interface ComquestRequestData<D> {
  data?: D;
}

export interface ComquestRequestError<E> {
  error?: E;
}

export type ComquestActionCreatorCreator<S> = (
  actionTypes: ComquestActionTypes,
  config: AxiosRequestConfig,
  options?: ComquestOptions
) => ComquestActionCreator<S>;

export type ComquestActionCreator<S> = (
  configOverrides?: AxiosRequestConfig,
  optionsOverrides?: ComquestOptions
) => ThunkAction<ComquestPromise, S, undefined, AnyAction>;

export type ComquestPromise = Promise<AxiosResponse | AxiosError>;
