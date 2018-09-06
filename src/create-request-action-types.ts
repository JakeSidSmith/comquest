import { RequestActionTypes } from './types';

export function createRequestActionTypes(name: string): RequestActionTypes {
  return {
    REQUEST: Symbol(`${name}.REQUEST`),
    SUCCESS: Symbol(`${name}.SUCCESS`),
    FAILURE: Symbol(`${name}.FAILURE`),
    CLEAR_DATA: Symbol(`${name}.CLEAR_DATA`),
    CLEAR_ERRORS: Symbol(`${name}.CLEAR_ERRORS`),
    RESET_STATE: Symbol(`${name}.RESET_STATE`),
    ABORT_REQUESTS: Symbol(`${name}.ABORT_REQUESTS`),
  };
}
