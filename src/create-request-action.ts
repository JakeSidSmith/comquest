import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as deepMerge from 'deepmerge';
import * as pathToRegexp from 'path-to-regexp';
import {
  RequestActionCreator,
  RequestActionTypes,
  RequestOptions,
} from './types';

export function createRequestAction<StoreState, Data>(
  actionTypes: RequestActionTypes,
  config: AxiosRequestConfig,
  options: RequestOptions = {}
): RequestActionCreator<StoreState, Data> {
  return (configOverrides = {}, optionsOverrides = {}) => dispatch => {
    const mergedConfig = deepMerge<AxiosRequestConfig>(config, configOverrides);
    const mergedOptions = deepMerge<RequestOptions>(options, optionsOverrides);

    const { url = '' } = mergedConfig;
    const { params } = mergedOptions;

    const resolvedUrl = params ? pathToRegexp.compile(url)(params) : url;

    dispatch({ type: actionTypes.REQUEST, options: mergedOptions });

    return axios
      .request<Data>({
        ...mergedConfig,
        url: resolvedUrl,
      })
      .then<AxiosResponse<Data>, AxiosError | Error>(
        (response: AxiosResponse<Data>) => {
          dispatch({
            type: actionTypes.SUCCESS,
            payload: response,
            options: mergedOptions,
          });

          return response;
        },
        (error: AxiosError | Error) => {
          dispatch({
            type: actionTypes.FAILURE,
            payload: error,
            options: mergedOptions,
          });

          return error;
        }
      );
  };
}
