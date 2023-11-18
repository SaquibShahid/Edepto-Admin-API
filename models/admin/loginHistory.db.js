const mongoose = require("mongoose");
const Admin = require('./admin.db');
const { string } = require("joi");

const adminLoginSchema = new mongoose.Schema({
    adminId: { type: mongoose.Types.ObjectId, ref: 'admins', required: true, index: true },
    loginTime: { type: String, required: true },
    sessionId: { type: String, required: true, index: true, unique: true },
    ipAddress: { type: String, required: true, index: true },
    logoutTime: { type: String },
    sessionDuration: { type: Number, required: true, default: 0 }
}, {
    timestamps: {
        currentTime: () => new Date().getTime() + 5.5 * 60 * 60 * 1000
    }
});

const AdminLogin = new mongoose.model("login-histories", adminLoginSchema);

module.exports = AdminLogin;

