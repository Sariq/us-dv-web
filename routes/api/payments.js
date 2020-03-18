const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const PaymentsSchema = mongoose.model('Payments');
var querystringP = require('querystring');



const https = require('https')
const querystring = require('querystring');

let options = {
  hostname: 'secure5.tranzila.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  agent: false,
  method: 'GET'
}
const makePaymet = async (user, payment, token) => {
  return new Promise(function (resolve, reject) {

    const parameters = {
      supplier: "fadilarec",
      TranzilaPW: "Mo928Gn",
      ccno: payment.number,
      TranzilaTK: token,
      expdate: payment.expiry,
      sum: 10,
      cred_type: 1,
    }
    const get_request_args = querystring.stringify(parameters);
    options.path = '/cgi-bin/tranzila71u.cgi?' + get_request_args;
    const req2 = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      res.on('data', d => {
        console.log(`statusCode: ${d}`)
        d = d.toString();
        var paymentResObj = querystringP.parse(d);

        // Users.findOne({ email: payment.email })
        //   .then((result) => {
        //     const finalUser = result;
        //     finalUser.payment.updated_at = Date.now();

        //     finalUser.payment.confirmationCode = paymentResObj.ConfirmationCode;
        //paymentSc.tempref = paymentResObj.Tempref;
        Users.findByIdAndUpdate(user._id, { $set: { 'payment.updated_at': Date.now(), 'payment.confirmationCode': paymentResObj.ConfirmationCode } }, {new: true}, function (err, doc) {
          resolve(doc);
        });
        // });
      });

    });


    req2.on('end', () => {
      console.log(JSON.parse(data));
    });
    req2.on('error', error => {
      console.error(error)
    })
    req2.end()
  })
};


router.post('/pay', auth.required,  (req, res, next) => {
  try {
  const payment = req.body;
  if (!payment.email) {
    return res.status(422).json({
      errors: {
        payment: 'is required',
      },
    });
  }
  Users.findOne({ email: payment.email })
    .then((result) => {
      if (result) {
        const parameters = {
          supplier: "fadilarec",
          TranzilaPW: "Mo928Gn",
          ccno: payment.number,
          TranzilaTK: "1"

        }
        const get_request_args = querystring.stringify(parameters);
        options.path = '/cgi-bin/tranzila71u.cgi?' + get_request_args;
        const req2 = https.request(options, resp => {
          console.log(`statusCode: ${resp.statusCode}`)
          resp.on('data', async d => {
            console.log(`statusCode: ${d}`)
            const finalUser = result;
            payment.token = d.toString();;
            payment.created_at = Date.now();

            payment.updated_at = Date.now();
            //const paymentSc = new PaymentsSchema(payment);
            finalUser.payment = payment;
            let saveUser = await finalUser.save();
            const data = await makePaymet(finalUser, payment, d);
            res.json(data);
          });
        })
        req2.on('error', error => {
          console.error(error)
        })
        req2.end()
      } else {
        return res.status(422).json({
          errors: {
            data: 'User not found',
          },
        });
      }
    });
  }catch (err) {
    console.log('err' + err);
    res.status(500).send(err);
  }
});


router.post('/pay', auth.required, (req, res, next) => {
  const payment = req.body;
  if (!payment.email) {
    return res.status(422).json({
      errors: {
        payment: 'is required',
      },
    });
  }
  Users.findOne({ email: payment.email })
    .then((result) => {
      if (result) {
        const finalUser = result;
        delete payment.token;
        //const paymentSc = new PaymentsSchema(payment);
        // return paymentSc.save()
        //   .then(() => {
        finalUser.payments = payment;
        return finalUser.save()
          .then(() => res.json({ user: finalUser }));
        // });

      } else {
        return res.status(422).json({
          errors: {
            data: 'User not found',
          },
        });
      }
    });
});

router.post('/get-payments', auth.required, (req, res, next) => {
  const user = req.body;
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }
  Users.findOne({ email: user.email })
    .then((result) => {
      if (result) {
        return res.json(result.payments);
      } else {
        return res.status(422).json({
          errors: {
            data: 'User',
          },
        });
      }
    });
});






module.exports = router;