const express = require('express');
const app = express();
const router = express.Router();

const logController = require('./../Controllers/logController');

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.get("/",logController.getLogs)

module.exports = router;
