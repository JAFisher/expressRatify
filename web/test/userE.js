// successful missing newsletter email parameter however because it conditional it doesn't matter.

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
    type: "email",
    size: 12,
    param: "newsletter",
    conditional: true
}], responseMock);

vows.describe('User E').addBatch({
    "Validation is unsuccessful": {
        "`message has passed due to conditional`": function () {
            assert.equal(message.pass, true);
        },
    }
}).export(module);
