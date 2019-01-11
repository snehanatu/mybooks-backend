// We need to be able to access the Service 
//that we just created so let's pull that in

var BookService = require('../services/book.service.js');

// Make sure to save the context of 
//this module inside the _this variable

_this = this

exports.getBooks = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        try{
        
            var books = await BookService.getBooks({}, page, limit)
            
    // Return the books list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: books, message: "Succesfully Books Recieved"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
    }

    exports.createBook = async function(req, res, next){

        // Note: Req.Body contains the form submit values.
        console.log(req.body);
        var book = {
            name: req.body.name,
            author: req.body.author,
            publisher: req.body.publisher,
            cost: req.body.cost,
            pages: req.body.pages,
            booktype: req.body.publisher,
            status: req.body.status
        }
        console.log(book);
        try{
            
    // Calling the Service function 
    //with the new object from the Request Body
            console.log("before calling service from backend");
        
            var createdBook = await BookService.createBook(book)
            console.log("after calling service from backend");
            return res.status(201).json({status: 201, data: createdBook, message: "Succesfully Created Book"})
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
    return res.status(400).json({status: 400, message: "Book Creation was Unsuccesfull, I am sorry :( "})
        }
    }

    exports.updateBook = async function(req, res, next){

        // Id is necessary for the update
    
        if(!req.body._id){
            return res.status(400).json({status: 400., message: "Id must be present"})
        }
    
        var id = req.body._id;
    
        console.log(req.body)
    
        var book = {
            id,
            name: req.body.name ? req.body.name : null,
            author: req.body.author ? req.body.author : null,
            publisher: req.body.publisher ? req.body.publisher : null,
            cost: req.body.cost ? req.body.cost : null,
            pages: req.body.pages ? req.body.pages : null,
            booktype: req.body.booktype ? req.body.booktype : null,
            status: req.body.status ? req.body.status : null
        }
    
        try{
            var updatedBook = await BookService.updateBook(book)
            return res.status(200).json({status: 200, data: updatedBook, message: "Succesfully Updated Book"})
        }catch(e){
            return res.status(400).json({status: 400., message: e.message})
        }
    }
    
    exports.removeBook = async function(req, res, next){

        var id = req.params.id;
    
        try{
            var deleted = await BookService.deleteBook(id)
            return res.status(204).json({status:204, message: "Succesfully Book Deleted"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    
    }
    