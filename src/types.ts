import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface StringIndexedObject<T = any> {
  [i: string]: T;
}

export interface ActionHandlers<S> {
  [i: string]: (state: S, action: any) => S;
}

export type HandlersReducer<S, A extends AnyAction> = (
  state: S | undefined,
  action: A
) => S;

export interface ComquestActionTypes {
  readonly REQUEST: symbol;
  readonly SUCCESS: symbol;
  readonly FAILURE: symbol;
  readonly CLEAR_RESPONSE: symbol;
  readonly CLEAR_ERROR: symbol;
  readonly RESET_STATE: symbol;
  // readonly CANCEL_REQUESTS: symbol;
}

export type ComquestResponseTransform<D = AxiosResponse, TD = D> = (
  response: D
) => TD;

export type ComquestErrorTransform<E = AxiosError, TE = E> = (error: E) => TE;

export type ComquestMiddlewareOptions<
  D = AxiosResponse,
  E = AxiosError,
  TD = D,
  TE = E
> = Partial<{
  readonly transformResponse: ComquestResponseTransform<D, TD>;
  readonly transformError: ComquestErrorTransform<E, TE>;
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
  // readonly clearResponseOnRequest: boolean;
  // readonly clearResponseOnSuccess: boolean;
  // readonly clearResponseOnFailure: boolean;
  // readonly clearErrorOnRequest: boolean;
  // readonly clearErrorOnSuccess: boolean;
  // readonly clearErrorOnFailure: boolean;
  // readonly resetStateOnRequest: boolean;
  // readonly resetStateOnSuccess: boolean;
  // readonly resetStateOnFailure: boolean;
}>;

export interface ComquestRequiredActionMeta {
  readonly comquest: symbol;
  readonly genericType: symbol;
  readonly actionTypes: ComquestActionTypes;
}

export interface ComquestRequiredRequestActionMeta {
  readonly url: string;
  readonly cancelTokenSource: CancelTokenSource;
  readonly options: ComquestRequestOptions;
  readonly config: AxiosRequestConfig;
}

export interface ComquestActionMeta<D = any, E = any>
  extends ComquestRequiredActionMeta,
    Partial<ComquestRequiredRequestActionMeta> {
  readonly originalResponse?: D;
  readonly originalError?: E;
}

export interface ComquestRequestActionMeta
  extends ComquestRequiredActionMeta,
    ComquestRequiredRequestActionMeta {}

export interface ComquestSuccessActionMeta<D = AxiosResponse>
  extends ComquestRequiredActionMeta,
    ComquestRequiredRequestActionMeta {
  readonly originalResponse: D;
}

export interface ComquestFailureActionMeta<E = AxiosError>
  extends ComquestRequiredActionMeta,
    ComquestRequiredRequestActionMeta {
  readonly originalError: E;
}

export interface ComquestAction<P = any, D = any, E = any> extends Action {
  readonly type: symbol;
  readonly payload?: P;
  readonly error?: boolean;
  readonly meta: ComquestActionMeta<D, E>;
}

export interface ComquestRequestAction extends Action {
  readonly type: symbol;
  readonly meta: ComquestRequestActionMeta;
}

export interface ComquestSuccessAction<P = AxiosResponse, D = AxiosResponse>
  extends Action {
  readonly type: symbol;
  readonly payload: P;
  readonly meta: ComquestSuccessActionMeta<D>;
}

export interface ComquestFailureAction<P = AxiosError, E = AxiosError>
  extends Action {
  readonly type: symbol;
  readonly error: true;
  readonly payload: P;
  readonly meta: ComquestFailureActionMeta<E>;
}

export interface ComquestState {
  readonly loading: boolean;
  readonly requestCount: number;
  readonly successCount: number;
  readonly failureCount: number;
  readonly completeCount: number;
  readonly inFlightCount: number;
}

export interface ComquestResponse<D = AxiosResponse> {
  readonly response?: D;
}

export interface ComquestError<E = AxiosError> {
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
) => ThunkAction<ComquestPromise, S, undefined, ComquestAction>;

export type ComquestPromise = Promise<AxiosResponse | AxiosError>;
