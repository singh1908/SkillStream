const mongoose = require("mongoose");

const pdfNotesSchema = new mongoose.Schema({
    title: String,
    file: String
}, {collection: "pdfDetails"})

mongoose.model("pdfDetails", pdfNotesSchema);