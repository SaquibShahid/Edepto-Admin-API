const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const request = require('../security/request.security');

router.post('/login',request.receiveReq,adminController.login);


module.exports = router;