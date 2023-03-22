const express = require("express");
const router = express.Router();
const { showGoogleAuth, loginUserAfterAuthSuccess } = require('./../functions/BrokerModel')

router.get('/login', (req, res) => {
    showGoogleAuth(req, res)
})
.get('/google/success', (req, res) => {
    loginUserAfterAuthSuccess(req, res);
})

module.exports = router;