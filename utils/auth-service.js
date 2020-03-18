
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Users = mongoose.model('Users');

generateJWT = async function (user) {
    return new Promise(function (resolve, reject) {

        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        const token = jwt.sign({
            email: user.email,
            id: user._id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');
        Users.findByIdAndUpdate(user._id, { $set: { 'token': token } }, { new: true }, function (err, doc) {
            resolve(token);
        });
    });
}
const toAuthJSON = async function (user) {
    return new Promise(function (resolve, reject) {
        generateJWT(user).then((result) => {
            resolve({
                _id: user._id,
                email: user.email,
                admin: user.admin,
                token: result,
                userName: user.userName,
                userData: {"registrationData":user.registrationData, "applicationData" :user.applicationData}
            });
        });

    });
};
const refreshToken = function(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Token ')) {
      // Remove Bearer from string
      token = token.slice(6, token.length);
    
  Users.findOne({ token: token })
  .then((result) => {
    if (!result) {
        return res.status(422).json({
          errors: {
            email: 'is required',
          },
        });
      }else{
        generateJWT(result).then((result) => {
            res.setHeader('Token', result);
            next();
         });
      }
       
    });
    }
      // user is authenticated

  };
const auth = {
    toAuthJSON: toAuthJSON,
    refreshToken: refreshToken
};
module.exports = auth;