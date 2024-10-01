const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./Models/db");
const AuthRouter = require("./Routes/AuthRouter");
const path = require("path");
const quizRoutes = require("./Routes/quizRoutes");


const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);

app.use('/api/quiz', quizRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})


// Multer for files

const multer  = require('multer')
require("./Models/PdfNotes");
app.use("/files", express.static("files"));
// static banane se files ko kahi see bhi access kar sakte hai
const PdfSchema = mongoose.model("pdfDetails");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.post("/upload-files", upload.single("file"), async(req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
       await PdfSchema.create({title: title, file: fileName});
       res.send({status: "ok"});
    } catch (error) {
        res.json({status: error});
    }
})

app.get("/get-files", async(req, res) => {
    try {
        PdfSchema.find({}).then((data) => {
            res.send({status: "ok", data: data})
        })
    } catch (error) {
        res.json({status: error});
    }
})

// Multer for videos

require("./Models/VideoCourses");
app.use("/videos", express.static("videos"));
// static banane se files ko kahi see bhi access kar sakte hai
const VideoSchema = mongoose.model("coursesDetails");

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './videos')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })
  
  const upload1 = multer({ storage: storage1 })

app.post("/upload-videos", upload1.single("video"), async(req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
       await VideoSchema.create({title: title, video: fileName});
       res.send({status: "ok"});
    } catch (error) {
        res.json({status: error});
    }
})

app.get("/get-videos", async(req, res) => {
    try {
        VideoSchema.find({}).then((data) => {
            res.send({status: "ok", data: data})
        })
    } catch (error) {
        res.json({status: error});
    }
})