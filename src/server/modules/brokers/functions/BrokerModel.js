const crypto = require('crypto');
const config = require('./../../../commons/config');
const restCall = require('./../../../utils/RestUtil');
const { base64urlDecode } = require('./../../../utils/AppUtil');
const challengeValue = crypto.randomUUID({ disableEntropyCache: true })

const showGoogleAuth = (req, res) => {
    const { ci, scope, callbackURL } = config.google;

    const googleLoginPageUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
        `client_id=${ ci }&response_type=code&scope=${ scope }&redirect_uri=${encodeURIComponent(callbackURL)}` +
        `&state=${challengeValue}`;


    res.redirect(googleLoginPageUrl);
}

const loginUserAfterAuthSuccess = async (req, res) => {
    try {

        const googleTokenSetURL = `https://oauth2.googleapis.com/token`;
        const { ci, cs, scope, callbackURL } = config.google;

        await restCall(googleTokenSetURL, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            body: new URLSearchParams({
                code: req.query.code,
                client_id: ci,
                client_secret: cs,
                redirect_uri: callbackURL,
                grant_type: 'authorization_code',
                state: challengeValue
            })
        }, responseData => {
            const tokenSplit = responseData.id_token.split('.');

            
            const userData = JSON.parse(base64urlDecode(tokenSplit[1]));
            console.log(userData)
        }, error => {
            console.log(error)
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    showGoogleAuth,
    loginUserAfterAuthSuccess
}