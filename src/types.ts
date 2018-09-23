import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface StringIndexedObject<T = any> {
  [i: string]: T;
}

export interface ComquestActionTypes {
  readonly REQUEST: symbol;
  readonly SUCCESS: symbol;
  readonly FAILURE: symbol;
  readonly CLEAR_REQUEST_DATA: symbol;
  readonly CLEAR_REQUEST_ERRORS: symbol;
  readonly RESET_REQUEST_STATE: symbol;
  readonly CANCEL_REQUESTS: symbol;
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
  readonly transformRequestData: ComquestRequestDataTransform<D, TD>;
  readonly transformRequestError: ComquestRequestErrorTransform<E, TE>;
}>;

export interface Params {
  [i: string]: string | number;
}

export type ComquestRequestOptions = Partial<{
  readonly params: Params;
  // readonly doNotSendIfExistingRequests: boolean;
  // readonly sendAfterExistingRequests: boolean;
  readonly throwErrors: boolean;
  readonly dispatchCancelledRequestErrors: boolean;
  // readonly cancelRequestsOnRequest: boolean;
  // readonly cancelRequestsOnSuccess: boolean;
  // readonly cancelRequestsOnFailure: boolean;
  // readonly clearRequestDataOnRequest: boolean;
  // readonly clearRequestDataOnSuccess: boolean;
  // readonly clearRequestDataOnFailure: boolean;
  // readonly clearRequestErrorsOnRequest: boolean;
  // readonly clearRequestErrorsOnSuccess: boolean;
  // readonly clearRequestErrorsOnFailure: boolean;
  // readonly resetRequestStateOnRequest: boolean;
  // readonly resetRequestStateOnSuccess: boolean;
  // readonly resetRequestStateOnFailure: boolean;
}>;

export interface ComquestActionMeta {
  readonly comquest: symbol;
  readonly type: symbol;
  readonly cancelTokenSource?: CancelTokenSource;
  readonly url?: string;
  readonly options?: ComquestRequestOptions;
  readonly config?: AxiosRequestConfig;
}

export interface ComquestAction<P = any> extends AnyAction {
  readonly type: symbol;
  readonly payload?: P;
  readonly error?: boolean;
  readonly meta: ComquestActionMeta;
}

export type ComquestSuccessAction<D = AxiosResponse> = ComquestAction<D> & {
  readonly payload: D;
};

export type ComquestFailureAction<E = AxiosError> = ComquestAction<E> & {
  readonly error: true;
  readonly payload: E;
};

export interface ComquestRequestState {
  readonly loading: boolean;
  readonly requestCount: number;
  readonly successCount: number;
  readonly failureCount: number;
  readonly completeCount: number;
  readonly inFlightCount: number;
}

export interface ComquestRequestData<D = AxiosResponse> {
  readonly data?: D;
}

export interface ComquestRequestError<E = AxiosError> {
  readonly error?: E;
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
