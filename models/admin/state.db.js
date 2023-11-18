const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const stateSchema = new Schema({
    states: { type: String, required: true },
    shortName: { type: String, required: true },
    logo: { type: String, required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "admins", index: true,sparse: true },
}, {
    timestamps: {
        currentTime: () => new Date().getTime() + 5.5 * 60 * 60 * 1000
    }
});

stateSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret.__v;
        delete ret.updatedBy;
        delete ret.createdAt;
        delete ret.updatedAt;
    }
};


module.exports = mongoose.model("states", stateSchema);