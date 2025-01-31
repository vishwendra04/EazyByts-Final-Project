let mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  name: { type: String, required: true },
  bio: { type: String , default: ''},
  friends: [{ type: String }],
  events: [{ type: String }]
})

module.exports = new mongoose.model('user', userSchema);