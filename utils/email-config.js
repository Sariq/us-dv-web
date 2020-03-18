const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'us.dv.pr@gmail.com',
      pass: 'Paris2020!'
    }
});

var mailOptions = {
    from: 'us.dv.pr@gmail.com',
    subject: 'Reset Password Secret Code',
};

const sendMail = (sentTo, tmp) => { 
    mailOptions.html = tmp;
    mailOptions.to = sentTo;
    transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
  
            return res.json({ data: "Email sent successfully" });
  
          }
        });
};

module.exports = sendMail;