require("dotenv").config();

const config = {
  appname: process.env.APP_NAME,
  server: {
    PORT: process.env.HTTP_PORT
  },
  google: {
    ci: process.env.GOOGLE_CLIENT_ID,
    cs: process.env.GOOGLE_CLIENT_SECRET,
    scope: process.env.GOOGLE_SCOPE,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  contextPath: process.env.CONTEXT_PATH
};

module.exports = config;

