# comquest

**Composable requests with redux thunk and axios**

This is a work in progress. Hopefully you'll see something here soon.

## The 3 Laws

1. Actions only handle request related functionality (sending requests, aborting requests) and dispatching other actions (clear data, clear errors, reset request state)

2. Reducers handle storing and transforming data (transforms specific to that endpoint)

3. Middleware handles global data transforms and action dispatching (normalizing errors, dispatching logout action for unauthenticated requests)

## Notes

MIDDLEWARE: Middleware can be used to clear data if requests finish after logout.

GLOBAL REDUCER: Create comquest reducer that stores all requests so that users can; abort all requests, clear all request data, clear all request errors, reset all request states.

DEMO: Create demo that allows users to skip through time, go offline, etc. Requests do not manually complete, but can return a successful response or error based on users choices. Setup several mock endpoints with schema so that users see in advance what they can return. Include actual source code in demos at compile time.

Thoughts:

Should aborting a request ever cause an error, or should aborted requests always be swallowed?
