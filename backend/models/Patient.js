const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Patient = new Schema({
   name: {
      type: String
   },
   age: {
    type: Number,
    required:true
    },
 gender: {
    type: String,
   required:true
    },
   email: {
      type: String,
      required:true
   },
   symptoms: {
      type: String,
      required:true
   },
   phoneNumber: {
      type: Number,
      required:true
   }
}, {
   collection: 'patients'
})

module.exports = mongoose.model('Patient', Patient)