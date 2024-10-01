const TeacherModel = require("../Models/Teacher");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const teacher_signup = async (req, res) => {
    try {
        const {name, subject, email, password} = req.body;
        const teacher = await TeacherModel.findOne({email});
        if(teacher){
            return res.status(409).json({message: "User already exists, please login", success: false});
        }
        const teacherModel = new TeacherModel({name, subject, email, password});
        teacherModel.password = await bcrypt.hash(password, 10);
        await teacherModel.save();
        
        res.status(201).json({message: "SignUp Successfully", success: true})
    } catch (err) {
        res.status(500).json({message: "Internal Server Error", success: false})
    }
}

const teacher_login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const teacher = await TeacherModel.findOne({email});
        if(!teacher){
            return res.status(403).json({message: "User doesn't exists, please signup", success: false});
        }

        const isPassEqual = await bcrypt.compare(password, teacher.password);
        if(!isPassEqual){
            return res.status(403).json({message: "Email or Password is Incorrect", success: false});
        }

        const jwtTokenTeacher = jwt.sign(
            {email: teacher.email, _id: teacher._id},
            process.env.JWT_SECRET_TEACHER,
            {expiresIn : "24h"}
        )
        
        res.status(200).json({message: "Login Successfully", success: true, jwtTokenTeacher, email, name: teacher.name})
    } catch (err) {
        res.status(500).json({message: "Internal Server Error", success: false})
    }
}

module.exports = {
    teacher_signup,
    teacher_login
}