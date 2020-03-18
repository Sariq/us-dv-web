const forgotPasswordTPL = require('../email-templates/forgot-password');

const getEmailTemplate = (tmpName,values) => {
    switch(tmpName){
        case "Forgot-Password":
            var emailTemplate = forgotPasswordTPL;
            var replaceArray = ['secretCode'];
            var replaceWith = values;
            for(var i = 0; i < replaceArray.length; i++) {
              emailTemplate = emailTemplate.replace(new RegExp('{' + replaceArray[i] + '}', 'gi'), replaceWith[i]);
            }
          return emailTemplate;
    }
    return null;
};


module.exports = getEmailTemplate;