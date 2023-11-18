const adminModel = require('../models/admin/admin.db');
const loginHistoryModel = require('../models/admin/loginHistory.db');
const jwt = require('jsonwebtoken');
const dateFormat = require("dateformat");

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const adminDetails = await adminModel.findOne({ email: email, password: password, status: 1 }).select({ email: 1, username: 1, profilePic: 1, _id: 1 , sessionId : 1 });

        if(adminDetails.sessionId!=null) {
            res.json({
                status: "Faliure",
                message: "Already logged in",
                responseCode: 500,
                data: "Login Failed"
            });
            return;
        }

        if (adminDetails) {
            const token = await adminDetails.generateToken();

            res.setHeader('Authorization', 'Bearer ' + token);

            let dateTime = dateFormat(
                new Date().toLocaleString("en-US", {
                    timeZone: "Asia/Calcutta",
                }),
                "yyyy-mm-dd H:MM:ss"
            );

            // adding login Info
            var adminLoginInfo = await new loginHistoryModel({
                adminId: adminDetails._id,
                sessionId: adminDetails.sessionId,
                loginTime: dateTime,
                ipAddress: req.ip
            })
            await adminLoginInfo.save();

            res.json({
                status: "sucess",
                message: "Login sucessfully",
                responseCode: 200,
                data: adminDetails
            });
        }
        else {
            res.json({
                status: "Faliure",
                message: "Login Failed",
                responseCode: 500,
                data: "Login Failed"
            });
        }
    } catch (e) {
        console.log(e);
        res.json({
            status: "Faliure",
            message: "Login Failed",
            responseCode: 500,
            data: "Login Failed"
        });
    }
}

exports.logout = async (req, res) => {
    try {
        let updateDetails = await adminModel.updateOne({ _id: req.headers.adminId,sessionId: req.headers.sessionId }, { sessionId: null });

        if(!updateDetails.modifiedCount){
            res.json({
                status: "Faliure",
                message: "Already logged out",
                responseCode: 500,
                data: "Logout Failed"
            });
            return;
        }

        let loginDetails = await loginHistoryModel.findOne({
            sessionId: req.headers.sessionId
        }).select({ loginTime: 1 });

        let dateTime = dateFormat(
            new Date().toLocaleString("en-US", {
                timeZone: "Asia/Calcutta",
            }),
            "yyyy-mm-dd H:MM:ss"
        );

        let logoutTime = new Date(dateTime).getTime();
        let loginTime = new Date(loginDetails.loginTime).getTime();

        let sessionDuration = (logoutTime - loginTime)/1000;

        loginDetails.logoutTime = dateTime;
        loginDetails.sessionDuration = sessionDuration;
        await loginDetails.save();

        res.json({
            status: "sucess",
            message: "Logout sucessfully",
            responseCode: 200,
            data: null
        });
    } catch (e) {
        console.log(e);
        res.json({
            status: "Faliure",
            message: "Logout Failed",
            responseCode: 500,
            data: "Logout Failed"
        });
    }
}


exports.getAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find({});
        res.status(200).send(admins);
    } catch (e) {
        res.status(500).send("Faliure");
    }
}