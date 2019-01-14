const AWS = require('aws-sdk');

exports.sendSMS = (to, message) => {
  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.SNS_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SNS_AWS_SECRET_ACCESS_KEY
  });

  let params = {
    Message: message,
    PhoneNumber: to
  };

  let SNS = new AWS.SNS({
    apiVersion: '2010-03-31'
  });

  /*var attributes = SNS.getSMSAttributes({
    attributes: ['DefaultSenderID' ,'DefaultSMSType', 'MonthlySpendLimit']
  }).promise().then(callback);*/

  let SMS = SNS.publish(params).promise();

  return SMS;

};
