// Author Jamie Fisher
// Created 20 Oct 2014
// V0.1
// !important for express node framework

var _ = require("underscore");
/*
    // express-validation is used when parsing POST/GET parameters.
    @Params is an array[Objects{
        param  : "username",
        type   : string,
        size : false,
        conditional : false
    },Request (Express)];

    return {
        message: String,
        pass : Boolean
    };
*/

var types = ["string", "text", "number", "email"];

function expressRatify() {
    return function(data, request){
        var message = {
            message: "All your fields are valid.",
            pass: true
        };
        if (!data || !request){
            return {
                message: "There is no data or no request been supplied.",
                pass: false
            };
        }
        if (!_.isArray(data)) {
            return {
                message: "Data isn't a valid Array.",
                pass: false
            };
        } else {

            // if something isn't valid we will return an error state.
            _.find(data, function(index, key){
                // if the validation is conditional we do not need to check it
                if (!_.isObject(index)){
                    message = {
                        message: "Data in array isn't an Object.",
                        pass: false
                    };
                    return true;
                }
                if (!index.type || !index.param) {
                    message = {
                        message: key + " doesnt either have a valid param or type.",
                        pass: false
                    };
                    return true;
                }

                var parameter = request.param(index.param);

                //  if there no parameter the first time check the querystring
                if (!parameter) {
                    parameter = request.query[index.param];
                    expressRatify.parameter[index.param] = parameter;
                }
                if (!parameter && !index.conditional){
                    message = {
                        message: "failed to find parameter ("+index.param+") in response.",
                        pass: false
                    };
                    return true;
                } else if (parameter){
                    // add the paramater to the ratify object so we have a method of accessing the data aft
                    expressRatify.parameters[index.param] = parameter;
                    if ((index.type === "string" || index.type === "text") && !_.isString(parameter)){
                        message = {
                            message: "param: ("+index.param+") isn't a valid String("+parameter+").",
                            pass: false
                        };
                        return true;
                    }
                    if (index.type === "number" && !_.isNumber(parameter)){
                        message = {
                            message: "param: ("+index.param+")  isn't a valid Number("+parameter+").",
                            pass: false
                        };
                    }
                    if (index.type === "email" && !_.isEmail(parameter)){
                        message = {
                            message: "param: ("+index.param+") isn't a valid Email Address("+parameter+"). ",
                            pass: false
                        };
                    }

                    if (index.size && parameter.length > index.size){
                        message = {
                            message: index.param+ " is to big("+parameter.length+") please use "+index.size+" or less.",
                            pass: false
                        };
                    }
                }
            });
        }
        message.ratify = {
            params : expressRatify.parameters
        };
        return message;
    };
}
// a method of getting all the parameters been invovled in the validation.
expressRatify.parameters = {};

//  Helper methods for checking email that aren't in underscore.
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
_.isEmail = validateEmail;

module.exports = new expressRatify;