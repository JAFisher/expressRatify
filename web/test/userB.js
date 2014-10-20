// unsuccessful password and email responseMock of a GET request. invalid email.

var vows = require('vows');
var assert = require('assert');
var validation = require("../lib/expressValidation");

var responseMock = {
    method : "GET",
    query : {
        email: "devjamiefishergmail.com",
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
}], responseMock);

// successful user a has a password and a username both are required
vows.describe('User B').addBatch({
    "Validation is unsuccessful": {
        "`message has failed due to invalid email`": function () {
            assert.equal(message.pass, false);
        },
    }
}).export(module);
