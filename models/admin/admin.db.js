require('dotenv').config();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, index: true },
    sessionId: { type: String, index: true, sparse: true },
    username: { type: String, required: true },
    profilePic: { type: String, required: true },
    status: { type: Number, required: true, default: 1, index: true },// 1: Active, 2: Inactive
    statusString: { type: String, required: true, default: "Active" }
}, {
    timestamps: {
        currentTime: () => new Date().getTime() + 5.5 * 60 * 60 * 1000
    }
});

adminSchema.methods.generateToken = async function () {
    try {
        let adminId = this._id;
        let sessionId = uuidv4().toString().replace(/-/g, '');
        const token = jwt.sign({ adminId: adminId, sessionId: sessionId }, process.env.JWT_SECRET_KEY);
        this.sessionId = sessionId;
        await this.save();
        return token;
    } catch (e) {
        console.log("the error is : " + e.message);
    }
}

const Admin = new mongoose.model("admins", adminSchema);

module.exports = Admin;
