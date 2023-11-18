const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const request = require('../security/request.security');



router.get('/logout',request.receiveReq,adminController.logout);
router.get('/admins',request.receiveReq,adminController.getAdmins);

module.exports = router;