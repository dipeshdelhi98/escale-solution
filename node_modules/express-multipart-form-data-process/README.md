[![npm version](https://badge.fury.io/js/express-multipart-form-data-process.svg)](https://badge.fury.io/js/express-multipart-form-data-process)
# express-multipart-form-data-process

A Node.js module that processes data with a multipart / form-data content type and can therefore be used in Microservices and Cloud Functions.
## Installation
```sh
npm install express-multipart-form-data-process --save
yarn add express-multipart-form-data-process
```
## Multipart File Parser
### Usage default
You can simply add to your service:
```javascript
const express = require('express');
const multipartFileParser = require('express-multipart-form-data-process');

const app = express();

app.use(multipartFileParser)
...
app.post('/', (req, res) => {
  const data = {
    files: req.files,
    ...req.body,
  }
  ...
})
```
### Usage with options
You can add options to your service as follows:
```javascript
const express = require('express');
const { multipartFileParser } = require('express-multipart-form-data-process');

const app = express();

app.use(multipartFileParser({
  fileOptions: {
    allowedMimesTypes: ['image/jpeg', 'image/png', 'application/pdf', ...]
  },
  busboyOptions: {
    ... // See the options at https://github.com/mscdex/busboy#busboy-methods
  }
}))
...
app.post('/', (req, res) => {
  const data = {
    files: req.files,
    ...req.body,
  }
  ...
})
```
### Options
* **fileOptions**
  * **allowedMimesTypes** - [string] - The MIME type is a standard identifier used on the Internet to indicate the type of data a file contains.

* **busboyOptions**
  * See the options below in [busboy](https://github.com/mscdex/busboy#busboy-methods)

  * The constructor takes the following valid config settings:

    * **headers** - object - These are the HTTP headers of the incoming request, which are used by individual   parsers.

    * **highWaterMark** - integer - highWaterMark to use for this Busboy instance (Default: WritableStream default).

    * **fileHwm** - integer - highWaterMark to use for file streams (Default: ReadableStream default).

    * **defCharset** - string - Default character set to use when one isn't defined (Default: 'utf8').

    * **preservePath** - boolean - If paths in the multipart 'filename' field shall be preserved. (Default: false)

    * **limits** - object - Various limits on incoming data. Valid properties are:

      * **fieldNameSize** - integer - Max field name size (in bytes) (Default: 100 bytes)

      * **fieldSize** - integer - Max field value size (in bytes) (Default: 1MB)

      * **fields** - integer - Max number of non-file fields (Default: Infinity)

      * **fileSize** - integer - For multipart forms, the max file size (in bytes) (Default: Infinity)

      * **files** - integer - For multipart forms, the max number of file fields (Default: Infinity)

      * **parts** - integer - For multipart forms, the max number of parts (fields + files) (Default: Infinity)

      * **headerPairs** - integer - For multipart forms, the max number of header key=>value pairs to parse   Default:  2000   * **(**same as node's http)

  * The constructor can throw errors:

    * **Unsupported** content type: $type - The Content-Type isn't one Busboy can parse

    * **Missing** Content-Type - The provided headers don't include Content-Type at all.
