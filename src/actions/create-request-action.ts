import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import deepMerge from 'deepmerge';
import * as pathToRegexp from 'path-to-regexp';
import {
  COMQUEST_FAILURE,
  COMQUEST_MAGIC_SYMBOL,
  COMQUEST_REQUEST,
  COMQUEST_SUCCESS,
} from '../constants';
import {
  ComquestAction,
  ComquestActionCreator,
  ComquestActionTypes,
  ComquestFailureAction,
  ComquestRequestOptions,
  ComquestSuccessAction,
} from '../types';

export function createComquestRequestAction<S, R>(
  actionTypes: ComquestActionTypes,
  config: AxiosRequestConfig,
  options: ComquestRequestOptions = {}
): ComquestActionCreator<S> {
  return function comquestAction(configOverrides = {}, optionsOverrides = {}) {
    return dispatch => {
      const mergedConfig = deepMerge<AxiosRequestConfig>(
        config,
        configOverrides
      );
      const mergedOptions = deepMerge<ComquestRequestOptions>(
        options,
        optionsOverrides
      );

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

      const requestAction: ComquestAction = {
        type: actionTypes.REQUEST,
        meta: {
          ...meta,
          comquestActionType: COMQUEST_REQUEST,
          comquestActionTypes: actionTypes,
        },
      };

      dispatch(requestAction);

      return axios
        .request<R>({
          ...mergedConfig,
          cancelToken: source.token,
          url: resolvedUrl,
        })
        .then<AxiosResponse<R>, AxiosError>(
          (response: AxiosResponse<R>) => {
            const successAction: ComquestSuccessAction = {
              type: actionTypes.SUCCESS,
              payload: response,
              meta: {
                ...meta,
                comquestActionType: COMQUEST_SUCCESS,
                comquestActionTypes: actionTypes,
                originalData: response,
              },
            };

            dispatch(successAction);

            return response;
          },
          (error: AxiosError) => {
            if (
              mergedOptions.dispatchCancelledRequestErrors ||
              !axios.isCancel(error)
            ) {
              const failureAction: ComquestFailureAction = {
                type: actionTypes.FAILURE,
                payload: error,
                error: true,
                meta: {
                  ...meta,
                  comquestActionType: COMQUEST_FAILURE,
                  comquestActionTypes: actionTypes,
                  originalError: error,
                },
              };

              dispatch(failureAction);
            }

            if (mergedOptions.throwErrors) {
              throw error;
            }

            return error;
          }
        );
    };
  };
}
