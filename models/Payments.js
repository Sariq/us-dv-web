const mongoose = require('mongoose');

const { Schema } = mongoose;

const PaymentsSchema = new Schema({
    "number" : String,
    "id" : String,
    "expiry" : String,
    "cvc" : String,
    "email" : String,
    "userId" : String,
    "token" : String,
    "confirmationCode" : String,
    "tempref": String,
    "created_at":{
      type: Date,
      default: Date.now
    }
  }, 
  { timestamps: true });

  mongoose.model('Payments', PaymentsSchema);