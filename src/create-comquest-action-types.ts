import { ComquestActionTypes } from './types';

export function createComquestActionTypes(name: string): ComquestActionTypes {
  return {
    REQUEST: Symbol(`${name}.REQUEST`),
    SUCCESS: Symbol(`${name}.SUCCESS`),
    FAILURE: Symbol(`${name}.FAILURE`),
    CLEAR_REQUEST_DATA: Symbol(`${name}.CLEAR_REQUEST_DATA`),
    CLEAR_REQUEST_ERRORS: Symbol(`${name}.CLEAR_REQUEST_ERRORS`),
    RESET_REQUEST_STATE: Symbol(`${name}.RESET_REQUEST_STATE`),
    CANCEL_REQUESTS: Symbol(`${name}.CANCEL_REQUESTS`),
  };
}
