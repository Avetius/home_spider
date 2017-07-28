/**
 * Created by sirius on 7/20/17.
 */
// config/authCtrl.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1073712569425481', // your App ID
        'clientSecret'  : '83772d350e0a5e9d58977587f7918f6f', // your App Secret
        'callbackURL'   : 'http://localhost:8088/user/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};

