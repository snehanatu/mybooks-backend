var express = require('express');

var router = express.Router();
var books = require('./api/books.route');


router.use('/books', books);


module.exports = router;