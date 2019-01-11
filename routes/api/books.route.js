var express = require('express')

var router = express.Router()

// Getting the Book Controller that we just created

var BookController = require('../../controllers/book.controller.js');


// Map each API to the Controller FUnctions

router.get('/', BookController.getBooks)

router.post('/', BookController.createBook)

router.put('/', BookController.updateBook)

router.delete('/:id',BookController.removeBook)


// Export the Router

module.exports = router;