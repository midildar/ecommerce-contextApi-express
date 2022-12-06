const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true,
        trim : true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('category',categorySchema)