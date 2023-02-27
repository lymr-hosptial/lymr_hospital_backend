const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 5000;
const {
    REGISTRATION_API_URL,
    AUTHENTICATION_API_URL,
  } = require('./URLs');
  
  const optionRegistration = {
    target: REGISTRATION_API_URL,
    changeOrigin: true, 
    logger: console,
  };
  
  const optionAuthentication = {
    target: AUTHENTICATION_API_URL,
    changeOrigin: true, 
    logger: console,
  };

const registrationProxy = createProxyMiddleware(optionRegistration);
const authenticationProxy = createProxyMiddleware(optionAuthentication);

app.get('/', (req, res) => res.send('lymr Gateway API'));
app.get('/auth', registrationProxy);
app.get('/registration', authenticationProxy);

app.listen(port, () => console.log(`lymr app listening on port ${port}!`));