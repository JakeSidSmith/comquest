import { AxiosRequestConfig } from 'axios';
import { createComquestRequestAction } from './create-comquest-request-action';
import {
  ComquestActionTypes,
  ComquestAPIEndpoint,
  ComquestRequestOptions,
} from './types';

export function createComquestAPIEndpoint<S, D>(
  actionTypes: ComquestActionTypes,
  config: Pick<AxiosRequestConfig, Exclude<keyof AxiosRequestConfig, 'method'>>,
  options: ComquestRequestOptions
): ComquestAPIEndpoint<S> {
  return {
    get: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'get' },
      options
    ),
    post: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'post' },
      options
    ),
    put: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'put' },
      options
    ),
    head: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'head' },
      options
    ),
    delete: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'delete' },
      options
    ),
    patch: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'patch' },
      options
    ),
    options: createComquestRequestAction<S, D>(
      actionTypes,
      { ...config, method: 'options' },
      options
    ),
  };
}
