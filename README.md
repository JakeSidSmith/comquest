# Comquest

**Composable requests with redux thunk and axios**

## About

This library allows you to easily create requests that dispatch redux actions, and store data, errors, and request states by composing some preset reducers.

You can also create actions to clear data, errors, or reset request states, and apply transforms to all requests so that data, and errors are stored in a consistent manner.

## Installation

Install with NPM:

```shell
npm i comquest -S
```

Note: `-S` is shorthand for `--save` to automatically add this to your package.json

If you are using a version of NPM that doesn't support package lock files I'd recommend using `-SE` or `--save-exact`, which will pin the version in your package.json.
