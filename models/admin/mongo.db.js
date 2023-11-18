const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    if (process.env.SERVER === "DEVELOPMENT") {
        console.log("Connected to MongoDB");
    }
}).catch(err => {
    console.error("App starting error:", err.message);
    process.exit(1);
});
const db = mongoose.connection;
module.exports = db;