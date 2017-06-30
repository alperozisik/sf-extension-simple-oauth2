'use strict';
const Blob = require('sf-core/blob');
module.exports = {

  /**
   * Get the authorization header used to request a valid token
   * @param  {String} clientID
   * @param  {String} clientSecret
   * @return {String}              Authorization header string token
   */
  getAuthorizationHeaderToken(clientID, clientSecret) {
    var str = `${clientID}:${clientSecret}`;
    var blob = new Blob(str);
    var base64 = blob.toBase64();
    return base64;
    //return new Buffer(str).toString('base64');
  },
};
