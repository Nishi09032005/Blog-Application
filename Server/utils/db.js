const mongoose = require('mongoose')
const URI = process.env.MONGO_URI

const connectDb = async()=>{
     try {
        await mongoose.connect(URI)
        console.log('connect to database')
     } catch (error) {
        console.log(error)
        process.exit(0)
     }
}
module.exports = connectDb