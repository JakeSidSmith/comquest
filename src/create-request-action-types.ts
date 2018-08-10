import { RequestActionTypes } from './types';

export const createRequestActionTypes = (name: string): RequestActionTypes => ({
  REQUEST: Symbol(`${name}.REQUEST`),
  SUCCESS: Symbol(`${name}.SUCCESS`),
  FAILURE: Symbol(`${name}.FAILURE`),
});
