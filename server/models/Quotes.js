const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true // The quote is mandatory
    },
    author: {
        type: String,
        required: true // The author name is mandatory
    }
  
   
});

const Quotes = mongoose.model("Quote", QuoteSchema);

module.exports = Quotes;
