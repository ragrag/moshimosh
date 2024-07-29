<div align="center">

<img src="https://github.com/user-attachments/assets/de85dba9-e275-404b-97e5-0fd08bff4c0a" alt="anya-forger" height="300">

</div>

## About

**moshimosh ≽^•༚•🎀≼** _(moshi-mosh)_ is a hybrid (esm/cjs) TypeScript Node package creator, with modern tooling, typedef docs generation and sensible defaults that just works

## Usage
```bash
npx moshimosh
```

### Whats included
- Hybrid ESM/CJS by [tshy](https://github.com/isaacs/tshy) that just works
- Test and Coverage with [vitest](https://vitest.dev/)
- Linting/Formatting with [Biome](https://biomejs.dev/)
- Linting/Formatting Git Pre-commit hooks with [lefthook](https://github.com/evilmartians/lefthook)
- Documentation generation from typedefs with [typedoc](https://typedoc.org/)
- Github action for building and testing
- Github action for updating docs in a GitHub Pages github.io repo

### Included npm scripts
- `prepare` - builds the package to dist emitting both ESM and CJS entrypoints
- `test` - runs tests and generates coverage reports
- `docs:gen` - generates documentation from built typescript .d.ts files
- `lint` - lints and formats files with Biome
- `lint:ci` - runs lint and formatting checks without auto-fixing (for ci)
- `githooks:install` - sets up linting and formatting pre-commit githooks with lefthook (run only once)
