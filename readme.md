Author: Jamie Fisher

License: MIT

`````
Install:
npm install express-ratify
`````
Tests are run in the web directory:
vows test/*

Express validation is a simple way of testing your parameters via the query string (GET) or (POST) parameters.

```````
var validation = require("express-ratify");
@param *Array of {type,size,conditional,param};
@param *Express Request.

var message = validation([{
    type: string  *types can either be string,number,email more validation will be added as and when required (feel free to contribute).
    size: 128 *should not go over 128 leave false if you dont want a size.
    conditional: true *doesnt matter if it defined or not but requires validation if it there.
    param: "username" *the parameter in the query string or post parameter we want to test
}],req (Express));

@return {
    message: "All your fields are valid.",
    pass: true | false
    ratify :{
        params : {
            // all your fields from get and post go in here.
        }
    }
}
``````
contributions:
    If you wish to add another type to the validation please write a test user. little reason of why your validation is useful in your pull request would be great for a little of insight on my part to :).

This project is using VOW as an testsuite.
