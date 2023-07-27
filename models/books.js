const mongoose= require('mongoose');
const { Schema } = mongoose;
require('dotenv').config()
const Books = require("./books.js");

const bookSchema= new Schema({
    title:{type: String,  required: true},
    description:{type: String, required:true},
    year:{type: Number},
    quantity:{type: Number, required: true},
    imageUrl:{type: String}
}


)


module.exports= mongoose.model('Book', bookSchema)