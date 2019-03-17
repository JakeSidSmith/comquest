import { ComquestActionTypes } from './types';

export function createActionTypes(name: string): ComquestActionTypes {
  return {
    REQUEST: Symbol(`${name}.REQUEST`),
    SUCCESS: Symbol(`${name}.SUCCESS`),
    FAILURE: Symbol(`${name}.FAILURE`),
    CLEAR_RESPONSE: Symbol(`${name}.CLEAR_RESPONSE`),
    CLEAR_ERROR: Symbol(`${name}.CLEAR_ERROR`),
    RESET_STATE: Symbol(`${name}.RESET_STATE`),
    // CANCEL_REQUESTS: Symbol(`${name}.CANCEL_REQUESTS`),
  };
}
