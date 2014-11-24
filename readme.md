Author: Jamie Fisher

License: MIT

`````
Install:
npm install express-ratify
`````
Tests are run in the web directory:
vows test/*

Express validation is a simple way of testing your parameters via the query string (GET) or (POST) parameters.


var validation = require("express-ratify");
@param *Array of {type,size,conditional,param};
@param *Express Request.

Example Validation.

```````
var message = validation([{
    type: string |number|email|array.
    size: 128 |null.
    conditional: true |false
    param: "username" // the parameter in the GET/POST
}],req (Express));

// if it doeesn't pass we return the failed response.
if (!message.pass){
    return res.json(message);
}

// else we carry on and we have a nice helper method for getting the params.

var params = message.ratify.params;
return res.json({ username: "hey your name was "+params.username});
``````

Example returned response from ratify.
--------------------------------------
@return {
    message: "All your fields are valid.",
    pass: true | false
    ratify :{
        params : {
            // all your fields from get and post go in here.
        }
    }
}


contributions:
    If you wish to add another type to the validation please write a test user. little reason of why your validation is useful in your pull request would be great for a little of insight on my part to :).

This project is using VOW as an testsuite.
