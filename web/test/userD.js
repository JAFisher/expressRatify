// unsuccessful missing fields. token is missing but it required!

var vows = require('vows');
var assert = require('assert');
var validation = require("../lib/expressRatify");

var responseMock = {
    method : "GET",
    query : {
        email: "devjamiefisher@gmail.com",
        password: "password"
    },
    param : function (){ return null; }
};

var message = validation([
{
    type: "email",
    size: 128,
    param: "email"
},{
    type: "string",
    size: 12,
    param: "password"
},{
    type: "string",
    param: "token"
}], responseMock);

vows.describe('User D').addBatch({
    "Validation is unsuccessful": {
        "`message has failed due to missing fields`": function () {
            assert.equal(message.pass, false);
            assert.equal(message.message, "failed to find parameter (token) in response.");
        },
    }
}).export(module);
