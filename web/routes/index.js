var express = require('express');
var validation = require("../lib/expressValidation");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// requires username and password via query string
// userA?username=bob&password=cat
router.get("/userA", function(req, res){
    var message = validation([{
        type: "string",
        size: 128,
        param: "username"
    },{
        type: "string",
        size: 12,
        param: "password"
    }], req);
    res.json(message);
});

// x-www form-encoded
// requires username and password via post params.
router.post("/userA", function(req, res){
    var message = validation([{
        type: "string",
        size: 128,
        param: "username"
    },{
        type: "string",
        size: 12,
        param: "password"
    }], req);
    res.json(message);
});

module.exports = router;
