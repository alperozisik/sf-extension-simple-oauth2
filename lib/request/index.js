module.exports = exports = request;

const Http = require("sf-core/net/http");
const jsonSafeStringify = require('json-stringify-safe');
const Querystring = require('./querystring').Querystring;

const form2Json = require("./form2json");

function request(options, callback) {
    const _qs = new Querystring();
    _qs.init(options);
    options.headers = options.headers || {};
    var newHeaders = {};
    for (var h in options.headers) {
        newHeaders[h.toLowerCase()] = options.headers[h];
    }

    if (options.form && !form.json) {
        form(options);
    }
    else if (!options.form && form.json) {
        json(options);
    }

    if (!options.uri && options.url) {
        options.uri = options.url;
        delete options.url;
    }

    var requestOptions = {
        headers: newHeaders,
        body: options.body,
        method: options.method || 'GET',
        url: options.uri
    };

    Http.request(requestOptions, function onSucecss(response) {
        requestResponse(response, callback, false);

    }, function onError(response) {
        requestResponse(response, callback, true);
    });



    function form(options) {
        if (options.form) {
            var form = options.form;
            if (!/^application\/x-www-form-urlencoded\b/.test(options.headers['content-type'])) {
                options.headers['content-type'] = 'application/x-www-form-urlencoded';
            }
            options.body = (typeof form === 'string') ?
                _qs.rfc3986(form.toString()) :
                _qs.stringify(form).toString('utf8');
        }
    }

    function json(options) {

        if (!options.headers['accept']) {
            options.headers['accept'] = 'application/json';
        }
        var val = options.json;

        if (typeof val === 'boolean') {
            if (options.body !== undefined) {
                if (!/^application\/x-www-form-urlencoded\b/.test(options.headers['content-type'])) {
                    options.body = safeStringify(options);
                }
                else {
                    options.body = _qs.rfc3986(options.body);
                }
                if (!options.headers['content-type']) {
                    options.headers['content-type'] = 'application/json';
                }
            }
        }
        else {
            options.body = safeStringify(val);
            if (!options.headers['content-type']) {
                options.headers['content-type'] = 'application/json';
            }
        }

    }

    function safeStringify(obj, replacer) {
        var ret;
        try {
            ret = JSON.stringify(obj, replacer);
        }
        catch (e) {
            ret = jsonSafeStringify(obj, replacer);
        }
        return ret;
    }
}

function requestResponse(response, callback, doError) {
    var body = parseBody(response);
    var resp = Object.assign({}, response, {
        body: body.body
    });
    if (doError) {
        callback(resp);
    }
    else {
        callback(null, resp, body.bodyString);
    }
}

function parseBody(response) {
    if (response.statusCode && response.statusCode < 100)
        return;
    var newHeaders = {};
    for (var h in response.headers) {
        newHeaders[h.toLowerCase()] = response.headers[h];
    }
    var bodyString, body;
    if (newHeaders["content-type"].indexOf("application/json") > -1) {
        bodyString = response.body.toString();
        body = JSON.stringify(bodyString);

    }
    else if (newHeaders["content-type"].indexOf("application/x-www-form-urlencoded") > -1) {
        bodyString = response.body.toString();
        body = form2Json(bodyString);
    }
    return {
        body: body,
        bodyString: bodyString
    };
}
