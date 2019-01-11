// Access our newly created Mongoose Model
var Book = require('../models/book.model.js')

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the Book List
exports.getBooks = async function(query, page, limit){

// Set up the mongoose-paginate option
    var options = {
        page,
        limit
    }
// Error Handling 
    
try {
    var books= await Book.paginate(query, options)
    

    return books;

} catch (e) {

// Error message if try didn't work

    throw Error('Oh No! We got an error while Paginating our Book List Tasks, so sorry!' )
}
}

exports.createBook = async function(book){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newBook = new Book({
            name: book.name,
            author: book.author,
            publisher: book.publisher,
            cost: book.cost,
            pages: book.pages,
            booktype: book.booktype,
            status: book.status
        })
        console.log("before save - exports.createBook" + newBook);
    
        try{
    
            // Let's go ahead and save the Book 
            var savedBook = await newBook.save()
            console.log("after save - exports.createBook");
    
            return savedBook;
        }catch(e){
          
            //if we can't create a Book we want to throw an error 
            console.error(e);
            console.log(e);
            throw Error("Error while Creating Book")
        }
    }

    exports.updateBook = async function(book){
        var id = book.id
    
        try{
            //Find the old Book Object by the Id
        
            var oldBook = await Book.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the Book")
        }
    
        // If no old Book Object exists return false
    
        if(!oldBook){
            return false;
        }
    
        console.log(oldBook)
    
        //Edit the Book Object
    
        oldBook.name = book.name
        oldBook.author = book.author
        oldBook.publisher = book.publisher
        oldBook.cost = book.cost
        oldBook.pages = book.pages
        oldBook.booktype = book.booktype
        oldBook.status = book.status
    
    
        console.log(oldBook)
    
        try{
            var savedBook = await oldBook.save()
            return savedBook;
        }catch(e){
            throw Error("And Error occured while updating the Book");
        }
    }

    exports.deleteBook = async function(id){
    
        // Delete the Book
    
        try{
            var deleted = await Book.deleteOne({_id: id})
            if(deleted.n === 0){
                throw Error("Book Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the Book")
        }
    }

