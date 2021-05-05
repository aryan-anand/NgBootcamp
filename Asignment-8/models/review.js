const mongoose = require('mongoose')

const blogReview = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
})

const Review = new mongoose.model('Review',blogReview)

module.exports = Review