export interface MockAxiosChainCall {
  arguments: any[]
}

export interface MockAxiosCall {
  arguments: any[];
  thenCalls: MockAxiosChainCall[];
  catchCalls: MockAxiosChainCall[];
}

type MockAxiosFunction = (...args: any[]) => MockAxiosPromise;

interface MockAxiosCalls {
  calls: MockAxiosCall[];
  requestCalls: MockAxiosCall[];
  getCalls: MockAxiosCall[];
  deleteCalls: MockAxiosCall[];
  headCalls: MockAxiosCall[];
  postCalls: MockAxiosCall[];
  putCalls: MockAxiosCall[];
  patchCalls: MockAxiosCall[];
}

interface MockAxiosMethods {
  clear(): void;
}

interface MockAxiosObject extends MockAxiosCalls, MockAxiosMethods {
  defaults: any;
  interceptors: {
    request: any;
    response: any;
  };
  request: MockAxiosFunction;
  get: MockAxiosFunction;
  delete: MockAxiosFunction;
  head: MockAxiosFunction;
  post: MockAxiosFunction;
  put: MockAxiosFunction;
  patch: MockAxiosFunction;
}

export type MockAxios = MockAxiosFunction & MockAxiosObject;

const MATCHES_CALLS = /calls$/i;

class MockAxiosPromise extends Promise<any> {
  private call: MockAxiosCall;

  public constructor(call: MockAxiosCall) {
    super((resolve) => {
      return resolve();
    });

    this.call = call;
  }

  public then(...args: any[]) {
    const call: MockAxiosChainCall = {
      arguments: args,
    };

    this.call.thenCalls.push(call);
    return new MockAxiosPromise(this.call);
  }

  public catch(...args: any[]) {
    const call: MockAxiosChainCall = {
      arguments: args,
    };

    this.call.catchCalls.push(call);
    return new MockAxiosPromise(this.call);
  }
}

let mockAxiosObject: MockAxiosObject;

mockAxiosObject = {
  defaults: {},
  interceptors: {
    request: {},
    response: {},
  },
  request: createMockAxiosFunction('requestCalls'),
  get: createMockAxiosFunction('getCalls'),
  delete: createMockAxiosFunction('deleteCalls'),
  head: createMockAxiosFunction('headCalls'),
  post: createMockAxiosFunction('postCalls'),
  put: createMockAxiosFunction('putCalls'),
  patch: createMockAxiosFunction('patchCalls'),
  calls: [],
  requestCalls: [],
  getCalls: [],
  deleteCalls: [],
  headCalls: [],
  postCalls: [],
  putCalls: [],
  patchCalls: [],
  clear,
};

const mockAxios: MockAxios = Object.assign(createMockAxiosFunction('calls'), mockAxiosObject);
function createMockAxiosFunction(key: keyof MockAxiosCalls) {
  return function mockAxiosFunction (...args: any[]) {
    const call: MockAxiosCall = {
      arguments: args,
      thenCalls: [],
      catchCalls: [],
    };

    mockAxios[key].push(call);
    return new MockAxiosPromise(call);
  };
}

function clear () {
  const mockAxiosObjectKeys = Object.keys(mockAxiosObject) as Array<keyof MockAxiosObject>;

  mockAxiosObjectKeys.forEach((key) => {
    if (MATCHES_CALLS.test(key) && Array.isArray(mockAxiosObject[key])) {
      mockAxiosObject[key as keyof MockAxiosCalls].forEach((call) => {
        call.thenCalls = [];
        call.catchCalls = [];
      });

      mockAxiosObject[key] = [];
    }
  });
}

export default mockAxios;
