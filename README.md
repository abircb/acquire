[![build status](https://travis-ci.org/abircb/acquire.svg?branch=master)](https://travis-ci.org/abircb/acquire-module)
[![dependencies status](https://david-dm.org/abircb/acquire/status.svg)](https://david-dm.org/abircb/acquire-module)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![badgen.net](https://badgen.net/badge/libraries/io/blue)](https://libraries.io/github/abircb/acquire-module)

# acquire-module
Node.js' `require` function on steroids

## Features
<ul>
  <li>Search for a module in multiple directories</li>
  <li>Search using both absolute and relative paths</li>
  <li>You can specify a module prefix as a search option</li>
</ul>

along with all the features of `require()`

## Usage

```js
const acquire = require('acquire-module')
```

#### acquire (moduleName, [options])

| Parameter | Type | Description |
| --- | --- | --- |
| moduleName | `<string>` | The name of the module (if present in `node_modules` or if paths are specified in `option.paths`). Can also simply include the module path to resolve. |
| [options] | `<Object>`| Additional search options for `moduleName`.|
| [options.paths] | `<string>` , `<Array>.string`| Paths to one or more directories to resolve module location from. For each path specified, both the path itself and `node_modules` will be searched.|
| [options.prefix] | `<string>`| Prefix of the given `moduleName`.|

• returns a `module` Object

## Examples
``` js
> const inquirer = acquire('inquirer')
> var _ = acquire('/core', { prefix: 'lodash' })
> const myModule = acquire('some-file.js', { paths: '.' })
> const anotherModule = acquire('file.js', {paths: './some/place/where/file/exists', prefix: 'some' })
> const nextModule = acquire('app.js', { paths: [ '.', '~/my-modules' ] })
> const doesSomething = acquire('something.js', { paths: [ 'some/place/unsure/where/file/is', '~/my-modules' , '.'] })

```
