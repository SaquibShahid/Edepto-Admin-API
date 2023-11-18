const CryptoJS = require("crypto-js");
const response = require('./response.security');

exports.receiveReq = function (req, res, next) {
    let encryptionKey = "1234567890123456";
    if (process.env.SERVER == "DEVELOPMENT") {
        encryptionKey = process.env.ENCRYPTION_KEY;
    }
    if ((req.query.encryption == "false") && process.env.SERVER == "DEVELOPMENT") {
        next();
        return;
    }
    if (req.method == "GET" || req.method == "DELETE") {
        if (req.headers["hash"]) {
            var decrypted = CryptoJS.AES.decrypt(req.headers["hash"], encryptionKey);
            let data = decrypted.toString(CryptoJS.enc.Utf8);
            let url = req.originalUrl;
            if (data != url) {
                return response.sendResp(req, res, {
                    status: "error",
                    message: "Invalid request",
                    responseCode: 500,
                    data: null
                });
            }
            next();
            return;
        }
        else {
            return response.sendResp(req, res, {
                status: "error",
                message: "Invalid request",
                responseCode: 500,
                data: null
            });
        }
    }
    else if (req.method == "POST" || req.method == "PATCH" || req.method == "PUT") {
        if (req.body.data) {
            var decrypted = CryptoJS.AES.decrypt(req.body.data, encryptionKey);
            let data = decrypted.toString(CryptoJS.enc.Utf8);
            if (data) {
                req.body = JSON.parse(data);
                delete req.body.data;
                next();
                return;
            }
            else {
                return response.sendResp(req, res, {
                    status: "error",
                    message: "Invalid request",
                    responseCode: 500,
                    data: null
                });
            }
        }
        else {
            return response.sendResp(req, res, {
                status: "error",
                message: "Invalid request",
                responseCode: 500,
                data: null
            });
        }
    }
    else {
        return response.sendResp(req, res, {
            status: "error",
            message: "Invalid request",
            responseCode: 500,
            data: null
        });
    }
}