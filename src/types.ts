export interface RequestActionTypes {
  REQUEST: symbol;
  SUCCESS: symbol;
  FAILURE: symbol;
}

export interface Params {[i: string]: string | number}

export type RequestOptions = Partial<{
  params: Params;
  doNotSendIfExistingRequests: boolean;
  sendAfterExistingRequests: boolean;
  abortExistingRequestsOnRequest: boolean;
  abortExistingRequestsOnSuccess: boolean;
  abortExistingRequestsOnFailure: boolean;
  clearDataOnRequest: boolean;
  clearDataOnSuccess: boolean;
  clearDataOnFailure: boolean;
  resetStateOnRequest: boolean;
  resetStateOnSuccess: boolean;
  resetStateOnFailure: boolean;
}>;
