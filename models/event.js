let mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    time: Date,
    owner: String,
    name: String,
    location: String,
    description: String,
    members: [String]
})

module.exports = new mongoose.model('event', eventSchema);