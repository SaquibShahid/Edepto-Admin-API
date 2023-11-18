const CryptoJS = require("crypto-js");

exports.sendResp = function (req, res, payload) {
    let data = null;
    let encryptionKey = "1234567890123456";
    if (process.env.SERVER == "DEVELOPMENT") {
        encryptionKey = process.env.ENCRYPTION_KEY;
    }
    if ((req.query.encryption == "false") && process.env.SERVER == "DEVELOPMENT") {
        return res.json({
            status: payload.status,
            message: payload.message,
            responseCode: payload.responseCode,
            data: payload.data
        });
    }
    if (payload.data) {
        let type = typeof payload.data;
        if (type == "object") {
            data = JSON.stringify(payload.data);
        }
        else {
            data = payload.data;
            data = data.toString();
        }
        var encrypted = CryptoJS.AES.encrypt(data, encryptionKey);
        data = encrypted.toString();
    }
    return res.json({
        status: payload.status,
        message: payload.message,
        responseCode: payload.responseCode,
        data: data
    });
}
