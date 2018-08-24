export interface MockAxiosChainCall {
  arguments: any[]
}

export interface MockAxiosCall {
  arguments: any[];
  thenCalls: MockAxiosChainCall[];
  catchCalls: MockAxiosChainCall[];
}

type MockAxiosFunction = (...args: any[]) => MockAxiosPromise;

interface MockAxiosObject {
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
  calls: MockAxiosCall[];
  clear(): void;
}

export type MockAxios = MockAxiosFunction & MockAxiosObject;

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
  request: mockAxiosFunction,
  get: mockAxiosFunction,
  delete: mockAxiosFunction,
  head: mockAxiosFunction,
  post: mockAxiosFunction,
  put: mockAxiosFunction,
  patch: mockAxiosFunction,
  calls: [],
  clear,
};

const mockAxios: MockAxios = Object.assign<MockAxiosFunction, MockAxiosObject>(mockAxiosFunction, mockAxiosObject);

function mockAxiosFunction (...args: any[]) {
  const call: MockAxiosCall = {
    arguments: args,
    thenCalls: [],
    catchCalls: [],
  };

  mockAxios.calls.push(call);
  return new MockAxiosPromise(call);
}

function clear () {
  mockAxiosObject.calls.forEach((call) => {
    call.thenCalls = [];
    call.catchCalls = [];
  });

  mockAxios.calls = [];
}

export default mockAxios;
