// successful password and username responseMock of a GET request.

var vows = require('vows');
var assert = require('assert');
var validation = require("../lib/expressRatify");


var responseMock = {
    method : "GET",
    query : {
        username: "Peter Jones",
        password: "Password"
    },
    param : function (){ return null; }
};

var message = validation([
{
    type: "string",
    size: 128,
    param: "username"
},{
    type: "string",
    size: 12,
    param: "password"
}], responseMock);

// successful user a has a password and a username both are required
vows.describe('User A').addBatch({
    "Validation successful": {
        "`message has passed`": function () {
            assert.equal(message.pass, true);
            assert.equal(message.message, "All your fields are valid.");
        },
    }
}).export(module);
