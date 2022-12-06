const mongoose = require("mongoose")

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        mongoose.connect(process.env.MONGODB_URL, connectionParams)
        console.log("connected to the database")
    } catch (error) {
        console.log(error)
        console.log("connection failed")
    }
}