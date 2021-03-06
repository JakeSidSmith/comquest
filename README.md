# Comquest

[![CircleCI](https://circleci.com/gh/JakeSidSmith/comquest/tree/master.svg?style=svg)](https://circleci.com/gh/JakeSidSmith/comquest/tree/master)

**Composable requests with redux thunk and axios**

## About

This library allows you to easily create requests that dispatch redux actions, and store data, errors, and request states by composing preset reducers.

You can also create actions to clear data, errors, or reset request states, and apply transforms to all requests so that data, and errors are stored in a consistent manner.

Requests are made with [axios](https://github.com/axios/axios), allowing you to configure them with a standard axios config object, with the addition of dynamic URL params using [path-to-regexp](https://github.com/pillarjs/path-to-regexp).

Actions are dispatched using [redux-thunk](https://github.com/reduxjs/redux-thunk), and store data, errors, and request states in a [redux](https://github.com/reduxjs/redux) store.

## Installation

Install with NPM:

```shell
npm i comquest -S
```

Note: `-S` is shorthand for `--save` to automatically add this to your package.json

If you are using a version of NPM that doesn't support package lock files I'd recommend using `-SE` or `--save-exact`, which will pin the version in your package.json.

## Getting started

All of these examples will use TypeScript, but this library also works with JavaScript, but omitting any type imports and definitions.

### Prerequisites

This library relies on having applied both [redux-thunk](https://github.com/reduxjs/redux-thunk) and Comquest middlewares. This is done when you first configure your redux store.

```typescript
import * as comquest from 'comquest';
import { createStore } from 'redux';
import { thunk } from 'redux-thunk';

import { rootReducer } from './store';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, comquest.createMiddleware({}))
);
```

### Creating requests

#### Request action types

Requests are formed by first creating an action types object using `createActionTypes`, that contains all of the action types (as symbols) required to make requests, clear responses, clear errors, and reset request states.

```typescript
import * as comquest from 'comquest';

export const GET_USER = comquest.createActionTypes('GET_USER');
```

It is recommended that the string passed to this function be unique, matching the constant that you assign, in constant-case (upper-case, underscore separated). This will aid debugging in the future as logging `GET_USER.REQUEST`, for example, will print a symbol with the same name e.g. `Symbol(GET_USER.REQUEST)`.

#### Request actions

These action types can now be used to construct a set of request actions with `createRequestActions`.

```typescript
import * as comquest from 'comquest';

const user = comquest.createRequestActions(GET_USER, {url: '/api/user/', method: 'GET'}, {});
```

The parameters of this function are as follows:

* `actionTypes` - An action types object created with `createActionTypes`
* `config` - An axios config object (all axios options are supported, with the addition of [dynamic URL params](#url-params))
* `options` - A Comquest options object (see [Comquest options](#comquest-options) for more details)

This returns an object with the following actions:

```typescript
interface {
  request: (config: AxiosRequestConfig: options: ComquestRequestOptions) => Promise;
  clearResponse: () => void;
  clearError: () => void;
  resetState: () => void;
}
```

You may like to de-structure and rename these actions as appropriate e.g.

```typescript
const {
  request: getUser,
  clearResponse: clearUser,
  clearError: clearUserErrors,
  resetState: resetUserState
} = comquest.createRequestActions(GET_USER, {url: '/api/user/', method: 'GET'}, {});
```

Each of these actions can also be created individually if desired, with the following functions:

```typescript
function createRequestAction(actionTypes: comquest.ComquestActionTypes, config: AxiosRequestConfig, options: comquest.ComquestRequestOptions);
function createClearResponseAction(actionTypes: comquest.ComquestActionTypes);
function createClearErrorAction(actionTypes: comquest.ComquestActionTypes);
function createResetStateAction(actionTypes: comquest.ComquestActionTypes);
```

#### Dispatching requests

Once you've created a request action this can be dispatched (using `store.dispatch`, or by connecting the action to a React component with [react-redux](https://github.com/reduxjs/react-redux)), to send the request and trigger the relevant actions.

The request action takes the following parameters:

* `config` - Optional axios config. This will be merged with the config object supplied on request action creation so you can override config keys, or supply additional ones.
* `options` - Optional Comquest options. This will be merged with the options object supplied on request action creation so you can override options, or supply additional ones.

Dispatching a request action

```typescript
store.dispatch(getUser({ headers: { Authorization: 'token 12345' } }, { params: { id: 'abcde' }));
```

### Clearing data, errors, and resetting request states

These can then be dispatched similarly to the request actions (using `store.dispatch`, or by connecting the actions to a React component).

```typescript
store.dispatch(clearUser());
```

### Storing response data, errors, and request state

Comquest provides several reducer creators for handling basic responses, errors, and request states.

These can be combined using the `composeReducers` function so that all of your request data can easily be accessed from a single object.

```typescript
import * as comquest from 'comquest';
import { combineReducers } from 'redux';

import { GET_USER } from './action-types';

export interface StoreState {
  user: comquest.ComquestState & comquest.ComquestResponse & comquest.ComquestError;
}

const user = comquest.composeReducers(
  comquest.createStateReducer(GET_USER),
  comquest.createResponseReducer(GET_USER),
  comquest.createErrorReducer(GET_USER)
);

export const rootReducer = combineReducers<StoreState>({
  user,
});
```

This example will create a reducer that returns data in the following shape:

```typescript
interface UserReducerState {
  // From request state reducer
  loading: boolean;
  requestCount: number;
  successCount: number;
  failureCount: number;
  completeCount: number;
  inFlightCount: number;
  // From request data reducer
  data?: AxiosResponse;
  // From request error reducer
  error?: AxiosError;
}
```

Note: response data is `AxiosResponse` by default, and errors are `AxiosError` by default, but the reducer creators and the types for their return values are generic. You can supply your own types, so that these can be more specific, or match global transforms if you are utilizing them (see [global transforms](#global-transforms) for more details).

## URL params

Comquest supports dynamic URL params by internally utilizing [path-to-regexp](https://github.com/pillarjs/path-to-regexp), and supplying a `params` option upon request (see [Comquest options](#comquest-options) for more details).

For example, if we had a user endpoint, that could return different users based on their ID, this would be handled as in the below example.

```typescript
const getUser = comquest.createRequestAction(GET_USER, {url: '/api/user/:id/', method: 'GET'}, {});

store.dispatch(getUser({}, {params: {id: 'abcde'}}));
```

In this case the url would be resolved to `/api/user/abcde/`.

## Chaining actions, and error handling

By default Comquest does not throw any errors, meaning that chaining from the returned promise will always trigger following `.then` calls.

In order to chain `.catch` calls, upon request failure, you should set the `throwErrors` option to `true`. It is recommended that this be done when dispatching a request (rather than upon creation of a request action) to avoid unhandled promise errors.

```typescript
store.dispatch((getUser({}, {throwErrors: true}))
  .then(afterSuccessHandler)
  .catch(afterFailureHandler);
```

## Comquest options

A Comquest request object supports the following options:

* `params` - an object of URL params to inject into the URL (see [URL params](#url-params) for more details)
* `throwErrors` - a boolean, that if true, will cause failed requests to throw an error
* `dispatchCancelledRequestErrors` - a boolean, that if true, will dispatch cancelled request errors (these are not dispatched by default, as often cancelled requests are intentional)

## Global transforms

When you apply the Comquest middleware, you can supply global transforms to be applied to all request data, and or request error actions.

```typescript
createMiddleware({
  transformResponse: (response: AxiosResponse) => response.data,
  transformError: (error: AxiosError) => error.response.data
});
```

These will have an effect of all of your reducers, so when defining the type of your store state, or your reducers, you should supply types to match the return values of the global transforms.

```typescript
interface User {
  name: string;
  email: string;
}

interface StoreState {
  user: comquest.ComquestState & comquest.ComquestResponse<User> & comquest.ComquestError<string>;
}

const user = comquest.composeReducers(
  comquest.createStateReducer(GET_USER),
  comquest.createResponseReducer<User>(GET_USER),
  comquest.createErrorReducer<string>(GET_USER)
);
```
