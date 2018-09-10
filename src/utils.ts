import { AxiosError, AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import {
  COMQUEST_FAILURE,
  COMQUEST_MAGIC_SYMBOL,
  COMQUEST_SUCCESS,
} from './constants';
import {
  ComquestAction,
  ComquestFailureAction,
  ComquestSuccessAction,
} from './types';

export function isComquestAction<P = any>(
  action: AnyAction | ComquestAction<P>
): action is ComquestAction<P> {
  return (
    action && action.meta && action.meta.comquest === COMQUEST_MAGIC_SYMBOL
  );
}

export function isComquestSuccessAction<D = AxiosResponse>(
  action: AnyAction | ComquestSuccessAction<D>
): action is ComquestSuccessAction<D> {
  return isComquestAction(action) && action.meta.type === COMQUEST_SUCCESS;
}

export function isComquestFailureAction<E = AxiosError>(
  action: AnyAction | ComquestFailureAction<E>
): action is ComquestFailureAction<E> {
  return isComquestAction(action) && action.meta.type === COMQUEST_FAILURE;
}
