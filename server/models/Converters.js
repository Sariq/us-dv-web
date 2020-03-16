const mongoose = require('mongoose');

const { Schema } = mongoose;

const ApplicationDataModel = new Schema({
  code: String,
  make: String,
  description: String,
  fuelType: String,
  platinum: Number,
  radium: Number,
  weight: Number,
  image: [],
  type: String,
  priceList: [],
  pricePercent:[]

}, 
{ timestamps: true });


mongoose.model('Converters', ApplicationDataModel);