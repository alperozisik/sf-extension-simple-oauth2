# sf-extension-simple-oauth2

This module is a forked version of [simple-oauth2](https://github.com/lelylan/simple-oauth2) modified to be used in Smartface enviornment.

For general usage plase refer to the [original REAME file](./ORIGINAL_README.md) first.
This file is remain untouched. Usage differences for Smartface are explained in this document.

## Install
This script will install the module for you:
```shell
(cd ~/workspace/scripts && npm i -S sf-extension-simple-oauth2)
```

## Usage
```javascript
const oauth2Lib = require('sf-extension-simple-oauth2');
```

### Supported flows
Only the following flows are now supported. Others will not work!
- Password Credentials Flow
- Client Credentials Flow


The usage is same as defined in the [original document](./ORIGINAL_README.md)
