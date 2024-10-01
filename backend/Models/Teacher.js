const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const TeacherModel = mongoose.model("teachers", TeacherSchema);
module.exports = TeacherModel;