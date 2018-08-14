import { RequestActionTypes } from './types';

export const createRequestActionTypes = (name: string): RequestActionTypes => ({
  REQUEST: Symbol(`${name}.REQUEST`),
  SUCCESS: Symbol(`${name}.SUCCESS`),
  FAILURE: Symbol(`${name}.FAILURE`),
  CLEAR_DATA: Symbol(`${name}.CLEAR_DATA`),
  CLEAR_ERRORS: Symbol(`${name}.CLEAR_ERRORS`),
  RESET_STATE: Symbol(`${name}.RESET_STATE`),
});
