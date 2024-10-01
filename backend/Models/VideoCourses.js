const mongoose = require("mongoose");

const videoCoursesSchema = new mongoose.Schema({
    title: String,
    video: String
}, {collection: "coursesDetails"})

mongoose.model("coursesDetails", videoCoursesSchema);