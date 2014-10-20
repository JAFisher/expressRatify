// successful password and email responseMock of a GET request. valid email.

var vows = require('vows');
var assert = require('assert');
var validation = require("../lib/expressValidation");

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
}], responseMock);

// successful user a has a password and a username both are required
vows.describe('User C').addBatch({
    "Validation is successful": {
        "`message has passed`": function () {
            assert.equal(message.pass, true);
        },
    }
}).export(module);
