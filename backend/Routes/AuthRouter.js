const { student_signupValidation, student_loginValidation } = require("../Middlewares/AuthValidation");
const {student_signup, student_login} = require("../Controllers/AuthController");
const {teacher_signupValidation, teacher_loginValidation} = require("../Middlewares/TeachAuthValidation");
const {teacher_signup, teacher_login} = require("../Controllers/TeachAuthController");
const router = require("express").Router();

router.post("/student-signup", student_signupValidation, student_signup);
router.post("/student-login", student_loginValidation, student_login);

router.post("/teacher-signup", teacher_signupValidation, teacher_signup);
router.post("/teacher-login", teacher_loginValidation, teacher_login);

module.exports = router;