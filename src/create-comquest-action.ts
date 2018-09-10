import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as deepMerge from 'deepmerge';
import * as pathToRegexp from 'path-to-regexp';
import {
  COMQUEST_FAILURE,
  COMQUEST_MAGIC_SYMBOL,
  COMQUEST_REQUEST,
  COMQUEST_SUCCESS,
} from './constants';
import {
  RequestActionCreator,
  RequestActionTypes,
  RequestOptions,
} from './types';

export function createRequestAction<S, D>(
  actionTypes: RequestActionTypes,
  config: AxiosRequestConfig,
  options: RequestOptions = {}
): RequestActionCreator<S> {
  return (configOverrides = {}, optionsOverrides = {}) => dispatch => {
    const mergedConfig = deepMerge<AxiosRequestConfig>(config, configOverrides);
    const mergedOptions = deepMerge<RequestOptions>(options, optionsOverrides);

    const { url = '' } = mergedConfig;
    const { params } = mergedOptions;

    const resolvedUrl = params ? pathToRegexp.compile(url)(params) : url;

    const source = axios.CancelToken.source();

    const meta = {
      comquest: COMQUEST_MAGIC_SYMBOL,
      cancelTokenSource: source,
      url: resolvedUrl,
      config: mergedConfig,
      options: mergedOptions,
    };

    dispatch({
      type: actionTypes.REQUEST,
      meta: { ...meta, type: COMQUEST_REQUEST },
    });

    return axios
      .request<D>({
        ...mergedConfig,
        cancelToken: source.token,
        url: resolvedUrl,
      })
      .then<AxiosResponse<D>, AxiosError>(
        (response: AxiosResponse<D>) => {
          dispatch({
            type: actionTypes.SUCCESS,
            payload: response,
            meta: {
              ...meta,
              type: COMQUEST_SUCCESS,
            },
          });

          return response;
        },
        (error: AxiosError) => {
          dispatch({
            type: actionTypes.FAILURE,
            payload: error,
            error: true,
            meta: {
              ...meta,
              type: COMQUEST_FAILURE,
            },
          });

          if (mergedOptions.throwError) {
            if (!mergedOptions.suppressAbortError || !axios.isCancel(error)) {
              throw error;
            }
          }

          return error;
        }
      );
  };
}
