import { ComquestActionTypes } from './types';

export function createComquestActionTypes(name: string): ComquestActionTypes {
  return {
    REQUEST: Symbol(`${name}.REQUEST`),
    SUCCESS: Symbol(`${name}.SUCCESS`),
    FAILURE: Symbol(`${name}.FAILURE`),
    CLEAR_DATA: Symbol(`${name}.CLEAR_DATA`),
    CLEAR_ERRORS: Symbol(`${name}.CLEAR_ERRORS`),
    RESET_STATE: Symbol(`${name}.RESET_STATE`),
    CANCEL_REQUESTS: Symbol(`${name}.CANCEL_REQUESTS`),
  };
}
