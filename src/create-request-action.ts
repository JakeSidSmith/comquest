import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as deepMerge from 'deepmerge';
import * as pathToRegexp from 'path-to-regexp';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ComquestAction, RequestActionTypes, RequestOptions } from './types';

export const createRequestAction = <StoreState, Data, Errors>
  (actionTypes: RequestActionTypes, config: AxiosRequestConfig, options: RequestOptions = {}) =>
    (configOverrides: AxiosRequestConfig = {}, optionsOverrides: RequestOptions = {}):
      ThunkAction<
        Promise<AxiosResponse<Data> | Errors>,
        StoreState,
        undefined,
        ComquestAction<Data, Errors>
      > =>
      (dispatch: Dispatch) => {
        const mergedConfig = deepMerge<AxiosRequestConfig>(config, configOverrides);
        const mergedOptions = deepMerge<RequestOptions>(options, optionsOverrides);

        const { url } = mergedConfig;
        const { params } = mergedOptions;

        const resolvedUrl = params ? pathToRegexp.compile(url || '')(params) : url;

        dispatch({type: actionTypes.REQUEST, options: mergedOptions});

        return axios
          .request<Data>({
            ...mergedConfig,
            url: resolvedUrl,
          })
          .then<AxiosResponse<Data>, Errors>(
            (response) => {
              dispatch({type: actionTypes.SUCCESS, payload: response, options: mergedOptions});

              return response;
            },
            (error) => {
              dispatch({type: actionTypes.FAILURE, payload: error, options: mergedOptions});

              return error;
            }
          );
  };
