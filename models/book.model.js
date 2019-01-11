var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    publisher: String,
    cost: String,
    pages: String,
    booktype: String,
    status: String
})

BookSchema.plugin(mongoosePaginate)
const Book = mongoose.model('Book', BookSchema)

module.exports = Book;