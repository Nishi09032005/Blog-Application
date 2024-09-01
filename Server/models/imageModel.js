const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    filename:String,
    path:String,
    title:String,
    description:String,
    uploadedAt:{type:Date,default:Date.now}
})
module.exports = mongoose.model('Image',imageSchema);