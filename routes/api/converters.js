const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Converters = mongoose.model('Converters');
const escapeRegex = require('../../utils/regex-escape');
const AWS = require('aws-sdk');
var fs = require('fs');
var multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })
const authService = require('../../utils/auth-service');
const querystring = require('querystring');

// Enter copied or downloaded access ID and secret key here
const ID = 'AKIAIWOGJLNUZTTLS73Q';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'converters';
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});
const uploadFile = (files) => {
  let locationslist = [];
  let counter = 0;
  return new Promise((resolve, reject) => {
    files.forEach((file, i) => {

      // Read content from the file
      //var base64data = file.toString('base64');
      //let buf = new Buffer.alloc(file )
      const fileName = `${new Date().getTime()}` + file.originalname;
      // Setting up S3 upload parameters
      const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: file.buffer,
        ContentType: 'image/jpeg'

      };

      // Uploading files to the bucket
      s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }
        locationslist.push(data.Location)
        counter++;
        if(counter === files.length){
          resolve(locationslist);
        }
        console.log(`File uploaded successfully. ${data.Location}`);
      });
    });
  });
};
//POST new user route (optional, everyone has access)
router.post('/add-converter', upload.array('fileData'), auth.optional, async (req, res, next) => {
  const converter = req.body;
  if (!converter.code) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }
  converter.image = await uploadFile(req.files);

  //converter.priceList = querystring.decode(converter.priceList);
  converter.priceList =JSON.parse(converter.priceList)


  

  console.log(converter)
  const finalConverter = new Converters(converter);

  return finalConverter.save()
    .then(() => res.json({ converter: finalConverter }));
});

router.post('/get-converter', auth.optional, (req, res, next) => {
  const { body: { converter } } = req;

  if (!converter.name) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  Converters.findOne({ name: converter.name }).exec(function (err, converter) {
    // User result only available inside of this function!
    res.json(converter) // => yields your user results
  })



});

router.get('/converters-page/:page', [auth.required, authService.refreshToken], async (req, res, next) => {
  // Declaring variable
  const resPerPage = 3; // results per page
  const page = req.params.page || 1; // Page 
  try {
    var foundPConverters = [];
    var numOfConverters = 0;
    if (req.query.search) {
      // Declaring query based/search variables
      const searchQuery = req.query.search,
        regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Find Demanded Products - Skipping page values, limit results       per page
      foundPConverters = await Converters.find({ name: regex })
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);
      numOfConverters = await Converters.count({ name: regex });

    } else {
      searchQuery = null;
      foundPConverters = await Converters.find({})
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);
      numOfConverters = await Converters.count();

    }
    // Count how many products were found
    // Renders The Page

    return res.json({
      converters: foundPConverters,
      currentPage: page,
      pages: Math.ceil(numOfConverters / resPerPage),
      searchVal: req.query.search,
      numOfResults: numOfConverters
    })

  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;