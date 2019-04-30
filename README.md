# node-imgur

[![Build Status](https://travis-ci.org/kaimallea/node-imgur.svg?branch=master)](https://travis-ci.org/kaimallea/node-imgur)

This project is currently being rewritten from scratch in TypeScript. A GitHub [project board](https://github.com/kaimallea/node-imgur/projects/1) has been created to track progress. Pull requests are welcome (see section on contributing below)!

The last version and its documentation can be [found on npm](https://www.npmjs.com/package/imgur).

## Contributing

### Branches

At the moment, the `master` branch is the only branch and is considered to be in-development/bleeding edge. Once enough core features have been written, a new release version will be created and published to npm.

### Dependencies

This project uses [Yarn](https://yarnpkg.com/en/) for dependency management. To install dependencies, simply run `yarn` in the root of the project.

```bash
$ yarn
```

### Linting

`husky` and `lint-staged` are used to automatically enforce lint and formatting rules when committing changes.

### Testing

All pull requests should include tests.
