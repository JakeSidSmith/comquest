import { RequestActionType } from './types';

export const createRequestActionTypes = (name: string): RequestActionType => ({
  REQUEST: Symbol(`${name}.REQUEST`),
  SUCCESS: Symbol(`${name}.SUCCESS`),
  FAILURE: Symbol(`${name}.FAILURE`),
});
