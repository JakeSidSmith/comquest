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
  CLEAR_REQUEST_DATA: symbol;
  CLEAR_REQUEST_ERRORS: symbol;
  RESET_REQUEST_STATE: symbol;
  CANCEL_REQUESTS: symbol;
}

export type ComquestRequestDataTransform<D = AxiosResponse, TD = D> = (
  response: D
) => TD;

export type ComquestRequestErrorTransform<E = AxiosError, TE = E> = (
  error: E
) => TE;

export type ComquestMiddlewareOptions<
  D = AxiosResponse,
  E = AxiosError,
  TD = D,
  TE = E
> = Partial<{
  transformRequestData: ComquestRequestDataTransform<D, TD>;
  transformRequestError: ComquestRequestErrorTransform<E, TE>;
}>;

export interface Params {
  [i: string]: string | number;
}

export type ComquestRequestOptions = Partial<{
  params: Params;
  // doNotSendIfExistingRequests: boolean;
  // sendAfterExistingRequests: boolean;
  throwErrors: boolean;
  dispatchCancelledRequestErrors: boolean;
  // cancelRequestsOnRequest: boolean;
  // cancelRequestsOnSuccess: boolean;
  // cancelRequestsOnFailure: boolean;
  // clearRequestDataOnRequest: boolean;
  // clearRequestDataOnSuccess: boolean;
  // clearRequestDataOnFailure: boolean;
  // clearRequestErrorsOnRequest: boolean;
  // clearRequestErrorsOnSuccess: boolean;
  // clearRequestErrorsOnFailure: boolean;
  // resetRequestStateOnRequest: boolean;
  // resetRequestStateOnSuccess: boolean;
  // resetRequestStateOnFailure: boolean;
}>;

export interface ComquestActionMeta {
  comquest: symbol;
  type: symbol;
  cancelTokenSource?: CancelTokenSource;
  url?: string;
  options?: ComquestRequestOptions;
  config?: AxiosRequestConfig;
}

export interface ComquestAction<P = any> extends AnyAction {
  type: symbol;
  payload?: P;
  error?: boolean;
  meta: ComquestActionMeta;
}

export type ComquestSuccessAction<D = AxiosResponse> = ComquestAction<D> & {
  payload: D;
};

export type ComquestFailureAction<E = AxiosError> = ComquestAction<E> & {
  error: true;
  payload: E;
};

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
  options?: ComquestRequestOptions
) => ComquestActionCreator<S>;

export type ComquestActionCreator<S> = (
  configOverrides?: AxiosRequestConfig,
  optionsOverrides?: ComquestRequestOptions
) => ThunkAction<ComquestPromise, S, undefined, AnyAction>;

export type ComquestPromise = Promise<AxiosResponse | AxiosError>;
