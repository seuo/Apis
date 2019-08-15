var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// this will be our data base's data structure 
var ProjectSchema = new Schema(
  {
    id: Number,
    user: String,
    ideas: Array,
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Users', ProjectSchema);