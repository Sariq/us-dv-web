const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Payments = mongoose.model('Payments');

const { Schema } = mongoose;


const UsersSchema = new Schema({
  userName: String,
  email: String,
  admin: Boolean,
  registrationData: Object,
  applicationData: Object,
  loggedIn: Boolean,
  token: String,
  resetPasswordCode: Number,
  signUpCode: String,
  hash: String,
  salt: String,
  leadStatus: String
},
  { timestamps: true });

UsersSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    admin: this.admin,
    token: this.generateJWT(),
    userName: this.userName,
    userData: {
      registrationData: this.registrationData,
      applicationData: this.applicationData
    }
  }
};
UsersSchema.methods.getUserData = function () {
  return {
    registrationData: this.registrationData,
    applicationData: this.applicationData

  }
}


mongoose.model('Users', UsersSchema);