const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const jwt = require('jsonwebtoken');
const ROLES = require('../../utils/roles');
const getEmailTemplate = require('../../utils/email-template-helper');
const sendMail = require('../../utils/email-config');
const authService = require('../../utils/auth-service');
const escapeRegex = require('../../utils/regex-escape');
const uniqueRandom = require('unique-random');

const randomize = require('randomatic');
const EmailTemplate = require('email-templates').EmailTemplate;


//POST new user route (optional, everyone has access)
router.post('/', auth.optional, async (req, res, next) => {
  const { body: { user } } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  // if (!user.password) {
  //   return res.status(422).json({
  //     errors: {
  //       password: 'is required',
  //     },
  //   });
  // }

  Users.find({ email: user.email })
    .then((result) => {
      if (result.length > 0) {
        return res.status(400).json({
          errors: {
            message: 'User is already exist',
          },
        });;
      } else {
        const finalUser = new Users(user);
        const secretCode = randomize('A',3) + randomize('0',3);
        const rndFun =  uniqueRandom(1, 999999)
        const userName = rndFun();//randomize('A0', 6)


        finalUser.registrationData = user;
        finalUser.setPassword(secretCode);
        const emailValues = [secretCode];
        const emailTemplate = getEmailTemplate("Forgot-Password", emailValues);
        finalUser.signUpCode = secretCode;
        finalUser.userName = userName;
        return finalUser.save()
          .then(() => {
            //sendMail(finalUser.email, emailTemplate);
            return finalUser.save()
              .then(() => {
                authService.toAuthJSON(finalUser).then((result) => {
                  result.password = secretCode;
                  res.json({ user: result })
                });
              });
          });

      }
    });



});

router.post('/applyApplication', auth.required, (req, res, next) => {
  // const applicationData = req.body;
  const { body: { applicationObj } } = req;
  if (!applicationObj.userName) {
    return res.status(422).json({
      errors: {
        userName: 'is required',
      },
    });
  }
  Users.findOne({ userName: applicationObj.userName })
    .then((result) => {
      if (result) {
        const finalUser = result;

        finalUser.applicationData = applicationObj.applicationData;
        return finalUser.save()
          .then(() => res.json({ user: finalUser.toAuthJSON() }));

      } else {
        return res.status(422).json({
          errors: {
            data: 'User not found',
          },
        });
      }
    });
});
//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;
  if (!user.userName) {
    return res.status(422).json({
      errors: {
        userName: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      // if (user.loggedIn) {
      //   return res.status(400).json({
      //     errors: {
      //       password: 'User is already loggedIn',
      //     },
      //   });
      // }
      //user.loggedIn = true;
      return user.save().then(() => {
        authService.toAuthJSON(user).then((result) => {
          res.json({ user: result })
        });
      });
    }

    return status(400).info;
  })(req, res, next);
});
router.post('/signOut', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  return Users.findById(user._id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }
      user.loggedIn = false;
      user.token = null;

      return user.save()
        .then(() => res.json({ user: { email: user.email, "_id": user._id } }));
    });
});
//GET current route (required, only authenticated users have access)
router.post('/current', auth.required, (req, res, next) => {
  const { body: { user } } = req;

  return Users.findById(user._id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

router.post('/admin', auth.required, auth.checkIsInRole(ROLES.Admin), (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }
      user.loggedIn = false;
      req.logOut();
      return user.save()
        .then(() => res.json({ user: user.toAuthJSON() }));
    });
});

router.post('/forgot-password', (req, res, next) => {
  const { body: { user } } = req;
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
        const finalUser = result;
        const secretCode = randomize('0000');
        const emailValues = [secretCode];
        const emailTemplate = getEmailTemplate("Forgot-Password", emailValues);
        finalUser.resetPasswordCode = secretCode;
        finalUser.loggedIn = false;
        return finalUser.save()
          .then(() => {
            return sendMail(finalUser.email, emailTemplate);
          });


      } else {
        return { user: user.toAuthJSON() };
      }
    });
});

router.post('/reset-password', (req, res, next) => {
  const { body: { user } } = req;
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }
  Users.findOne({ email: user.email, resetPasswordCode: user.resetPasswordCode })
    .then((result) => {
      if (result) {
        const finalUser = result;
        finalUser.resetPasswordCode = null;
        finalUser.setPassword(user.password);
        return finalUser.save()
          .then(() => res.json({ user: finalUser }));
      } else {
        return res.status(422).json({
          errors: {
            data: 'User Or code not found',
          },
        });
      }
    });
});

router.post('/email-confirm', (req, res, next) => {
  const { body } = req;
  if (!body.secretCode) {
    return res.status(422).json({
      errors: {
        secretCode: 'is required',
      },
    });
  }
  Users.findOne({ _id: body.user._id, signUpCode: body.secretCode })
    .then((result) => {
      if (result) {
        const finalUser = result;
        finalUser.signUpCode = null;
        return finalUser.save()
          .then(() => res.json({ user: finalUser }));
      } else {
        return res.status(422).json({
          errors: {
            data: 'User Or code not found',
          },
        });
      }
    });
});

// router.get('/users-page/:page/:rowsPerPage', async (req, res, next) => {
//   // Declaring variable
//   const resPerPage = Number(req.params.rowsPerPage) || 10; // results per page
//   const page = req.params.page || 1; // Page 
//   try {
//     var foundPConverters = [];
//     var numOfConverters = 0;
//     if (req.query.search) {
//       // Declaring query based/search variables
//       const searchQuery = req.query.search,
//         regex = new RegExp(escapeRegex(req.query.search), 'gi');
//       // Find Demanded Products - Skipping page values, limit results       per page
//       foundPConverters = await Users.find( {$or:[{'registrationData.firstName': regex },{'registrationData.lastName': regex }, {'userName': regex }]})
//         .skip((resPerPage * page) - resPerPage)
//         .limit(resPerPage);
//       numOfConverters = await Users.count({$or:[{'registrationData.firstName': regex },{'registrationData.lastName': regex }, {'userName': regex }]});

//     } else {
//       searchQuery = null;
//       foundPConverters = await Users.find({})
//         .skip((resPerPage * page) - resPerPage)
//         .limit(resPerPage);
//       numOfConverters = await Users.count();

//     }
//     // Count how many products were found
//     // Renders The Page

//     return res.json({
//       users: foundPConverters,
//       currentPage: page,
//       pages: Math.ceil(numOfConverters / resPerPage),
//       searchVal: req.query.search,
//       numOfResults: numOfConverters
//     })

//   } catch (err) {
//     throw new Error(err);
//   }
// });
router.post('/users-page', async (req, res, next) => {
  // Declaring variable
  const { body } = req;
  const resPerPage = Number(body.data.rowsPerPage) || 10; // results per page
  const page = body.data.page || 1; // Page 
  try {
    var foundPConverters = [];
    var numOfConverters = 0;
    if (body.data.search || body.data.filterData) {
      // Declaring query based/search variables
   
   
      const searchQuery = body.data.search,
        regex = new RegExp(escapeRegex(body.data.search), 'gi');
      // Find Demanded Products - Skipping page values, limit results       per page
      let filterArray =[];
      if(body.data.search){
        filterArray = [{'registrationData.firstName': regex },{'registrationData.lastName': regex }, {'userName': regex }];
      }
      if(body.data.filterData){
        Object.keys(body.data.filterData).forEach(function(key) {
          var val = body.data.filterData[key];
          filterArray.push({[key]:body.data.filterData[key]})
          console.log(val)
        });
      }
   
      foundPConverters = await Users.find( filterArray.length > 0 ? {$or:filterArray} : {})
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);
      numOfConverters = await Users.count(filterArray.length > 0 ? {$or:filterArray} : {});

    } else {
      searchQuery = null;
      foundPConverters = await Users.find({})
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);
      numOfConverters = await Users.count();

    }
    // Count how many products were found
    // Renders The Page

    return res.json({
      users: foundPConverters,
      currentPage: page,
      pages: Math.ceil(numOfConverters / resPerPage),
      searchVal: req.query.search,
      numOfResults: numOfConverters
    })

  } catch (err) {
    throw new Error(err);
  }
});
router.get('/getUserById/:userId', (req, res, next) => {
  const userId = req.params.userId;
  return Users.findById(userId)
  .then((user) => {
    if (!user) {
      return res.sendStatus(400);
    }
    return res.json({ user: user.getUserData() });
  });
});
router.post('/deleteApplicationById', auth.optional, (req, res, next) => {
  const userId = req.body.userId;
  return Users.findById(userId)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }
      user.applicationData = null;
      return user.save()
        .then(() => res.json({ user: user.toAuthJSON() }));
    });
});
router.post('/updateLeadStatusById', auth.optional, (req, res, next) => {
  const userId = req.body.userId;
  const status = req.body.status;

  return Users.findById(userId)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }
      user.leadStatus = status;
      return user.save()
        .then(() => res.json({ user: user.toAuthJSON() }));
    });
});



module.exports = router;