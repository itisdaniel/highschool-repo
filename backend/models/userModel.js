const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  middlename: { type: String },
  lastname: { type: String, required: true },
  age: { type: Number },
  entry_year: { type: Date, min: "1980-09-28", max: new Date() },
  profile_pic: { type: String },
  current_city: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  role: { type: String, required: true, unique: 'Admin' },
});


module.exports = mongoose.model("user", UserSchema);