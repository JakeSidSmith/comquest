# comquest

**Composable requests with redux thunk and axios**

This is a work in progress. Hopefully you'll see something here soon.

## The 3 Laws

1. Actions only handle request related functionality (sending requests, aborting requests) and dispatching other actions (clear data, clear errors, reset request state)

2. Reducers handle storing and transforming data (transforms specific to that endpoint)

3. Middleware handles global data transforms and action dispatching (normalizing errors, dispatching logout action for unauthenticated requests)
