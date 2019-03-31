let path = require('path');
let aws = require('aws-sdk');
let multerS3 = require('multer-s3');
const multer = require('multer');

module.exports.upload = (fieldName = 'logo') => {
    let s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    });

    return multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.AWS_BUCKET_NAME || '',
            acl: 'public-read',
            metadata: function (req, file, cb) {
                cb(null, {
                    fieldName: file.fieldname
                });
            },
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return cb(new Error('Only image files are allowed!'));
                }
                cb(null, true);
            },
            key: function (req, file, cb) {
                cb(null, (Date.now().toString() + path.extname(file.originalname)))
            }
        })
    }).single(fieldName);
};