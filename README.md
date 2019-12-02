[![npm version](https://badge.fury.io/js/acquire-module.svg)](https://badge.fury.io/js/acquire-module)
![npm downloads](https://img.shields.io/npm/dm/acquire-module)
![build status](https://travis-ci.com/abircb/acquire-module.svg?token=kBvypWapbvpPYcC9Jrdw&branch=master)
[![dependencies Status](https://david-dm.org/abircb/acquire-module/status.svg)](https://david-dm.org/abircb/acquire-module)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![badgen.net](https://badgen.net/badge/libraries/io/blue)](https://libraries.io/github/abircb/acquire-module)
![license](https://img.shields.io/npm/l/acquire-module)

# acquire-module
Node.js' `require` function on steroids

## Installation

```cli
$ npm install acquire-module
```

## Features
<ul>
  <li>Search for a module in multiple directories</li>
  <li>Search using both absolute and relative paths</li>
  <li>You can specify a module prefix as a search option</li>
</ul>

along with all the existing features of `require()`

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

&copy; 2019 Abir Bhushan \<bhushan.abir@gmail.com\>.

&copy; 2017-19 Lloyd Brookes \<75pound@gmail.com\>.  
