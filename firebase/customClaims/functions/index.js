const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.setAdminRole = functions.https.onCall((data, context) => {
    return {
        message: `Sucess ${data.email}`
    }
})