import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import * as deepMerge from 'deepmerge';
import * as pathToRegexp from 'path-to-regexp';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RequestActionTypes, RequestOptions } from './types';

export interface StringKeyedObject {[i: string]: any}

export const createRequestAction = <StoreState, Data>
  (actionTypes: RequestActionTypes, config: AxiosRequestConfig, options: RequestOptions = {}) =>
    (configOverrides?: AxiosRequestConfig, optionsOverrides: RequestOptions = {}):
      ThunkAction<AxiosPromise<any>, StoreState, undefined, AnyAction> =>
      (dispatch: Dispatch) => {
        const mergedConfig = deepMerge(config, configOverrides);
        const mergedOptions = deepMerge(options, optionsOverrides);

        const { url } = mergedConfig;
        const { params } = mergedOptions;

        const resolvedUrl = params ? pathToRegexp.compile(url || '')(params) : url;

        dispatch({type: actionTypes.REQUEST, params});

        return axios
          .request({
            ...mergedConfig,
            url: resolvedUrl,
          })
          .then((response) => {
            dispatch({type: actionTypes.SUCCESS, params, payload: response});

            return response.data;
          })
          .catch((error) => {
            dispatch({type: actionTypes.FAILURE, params, payload: error});

            return error;
          });
  };
