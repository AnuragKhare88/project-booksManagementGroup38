const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: ObjectId,
        required: true,
        trim: true,
        ref: "User"
    },
    ISBN: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    subcategory: {
        type: String,
        required: true,
        trim: true
    },
    reviews: {
        type: number,
        default: 0
    },
    deletedAt: { type: Date },
    isDeleted: {
        type: boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Book", bookSchema)