const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const credentials = require('../config/credentials')
const token = require('../config/token')
const Promise = require('bluebird')

var EmailConfirmation = {};

function getOAuth2Client(info, cb) {
    // Load client secrets
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];

    var oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
    oauth2Client.credentials = token
    return cb(null, info, oauth2Client);
  }


function sendSampleMail(info, auth, cb) {
    var gmailClass = google.gmail('v1');

    var email_lines = [];

    email_lines.push('From: "Grievance Cell CET" <gopalkurup@gmail.com>');
    email_lines.push('To: '+info.email);
    email_lines.push('Content-type: text/html;charset=iso-8859-1');
    email_lines.push('MIME-Version: 1.0');
    email_lines.push('Subject:' + info.subject);
    email_lines.push('');
    email_lines.push('Dear '+info.username+',<br/><br/>');
    email_lines.push(info.content);//'Your verification token for Grievance Cell online portal is <b>'+info.verification_token+'</b>'

    var email = email_lines.join('\r\n').trim();

    var base64EncodedEmail = new Buffer(email).toString('base64');
    base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

    gmailClass.users.messages.send({
        auth: auth,
        userId: 'me',
        resource: {
        raw: base64EncodedEmail
        }
    }, cb);
}

/*   EmailConfirmation.Send = function(info) {
    return new Promise(function(resolve, reject) {
      getOAuth2Client(info)
      .then((info) => {
        sendSampleMail(info, oauth2Client, function(err, results))
        .then
      
      })
    })
  }
 */
  // gethuihidu(info)
  // .then((info) => {
  //   sendSampleMail(info)
  //   })
  // .then()
  // .catch((err) => {})

  // EmailConfirmation.Send = function(info) {
  //   return new Promise(function(resolve, reject) {
  //     getOAuth2Client(info, function(err, info, oauth2Client) {
  //       if (err) {
  //         console.log('err:', err);
  //         reject(err);
  //       } 
  //       else {
          // sendSampleMail(info, oauth2Client, function(err, results) {
          //   if (err) {
          //     console.log(' err:', err);
          //     reject(err);
          //   } 
          //   else {
          //     console.log(results);
          //     resolve(results);
          //   }
          // });
  //       }
  //     });
  //   });
  // };

EmailConfirmation.Send = function(info){
  console.log(__dirname);
  getOAuth2Client(info, function(err, info, oauth2Client) {
    if (err) {
      console.log('err:', err);
    } else {
      sendSampleMail(info, oauth2Client, function(err, results) {
        if (err) {
          console.log('err:', err);
        } else {
          console.log(results);
        }
      });
    }
  });
}

module.exports = EmailConfirmation;
