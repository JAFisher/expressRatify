// unsucessful userF tries to use a token however because it to long it has failed, the validation is trigger either though it conditional as it has failed the size validation.

var vows = require('vows');
var assert = require('assert');
var validation = require("express-ratify");

var responseMock = {
    method : "GET",
    query : {
        email: "devjamiefisher@gmail.com",
        password: "password",
        token: "absdjaldjldjlkdjaksldjlabdajdkajklada-jdkldjalk"
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
    size: 12,
    param: "token",
    conditional: true
}], responseMock);

vows.describe('User F').addBatch({
    "Validation is unsuccessful": {
        "`message has failed due to size`": function () {
            assert.equal(message.pass, false);
        },
    }
}).export(module);
