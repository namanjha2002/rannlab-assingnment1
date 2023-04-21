const studentModel = require('../model/student')
const jwt = require('jsonwebtoken');
 const config = require("../validations/aws")
const bcrypt = require('bcrypt')

const { isValid, regexEmail, regexPassword, regexName, regexPhone,isVaildfile } = require("../validations/validation")
const register = async function(req,res){
    try{
        // let files = req.files;
        let data = req.body
        console.log(data)
       
        let{firstName,lastName,schoolName,email,mobile,password,photo}=data
        // console.log(photo)
        if(!isValid(firstName)){
            return res.status(400).send({status:false,msg:"please provide firstName"})
        }
        if(!regexName.test(firstName)){
            return res.status(400).send({status:false,msg:"please provide name alphabetically"})
        }
        if(!isValid(lastName)){
            return res.status(400).send({status:false,msg:"please provide lastname"})
        }
        if(!regexName.test(lastName)){
            return res.status(400).send({status:false,msg:"please provide lastname alphabetically"})
        }
        if(!isValid(schoolName)){
            return res.status(400).send({status:false,msg:"please provide schoolname"})
        }
        if(!regexName.test(schoolName)){
            return res.status(400).send({status:false,msg:"please provide  schoolname alphabetically"})
        }
        
        if(!isValid(email)){
            return res.status(400).send({status:false,msg:"please provide email"})
        }
        if(!regexEmail.test(email)){
            return res.status(400).send({status:false,msg:"please provide valid email"})
        }
        const duplicateEmail = await studentModel.findOne({ email })
        if (duplicateEmail) {
            return res.status(400).send({ status: false, msg: "email is already registered" })
        }
        if(!isValid(mobile)){
            return res.status(400).send({status:false,msg:"please provide phone"})
        }
        if(!regexPhone.test(mobile)){
            return res.status(400).send({status:false,msg:"please provide valid phone"})
        }
        const duplicatemobile = await studentModel.findOne({ mobile })
        if (duplicatemobile) {
            return res.status(400).send({ status: false, msg: "phone is already registered" })
        }
        
        if(!isValid(password)){
            return res.status(400).send({status:false,msg:"please provide password"})
        }
        if (!isValid(password) || !regexPassword.test(password)) {
            return res.status(400).send({ status: false, message: "password is missing or invalid" })
        }

        const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    photo = req.files;
    if (photo.length > 0) {
      //upload to s3 and get the uploaded link
      let uploadedFileURL = await uploadFile(photo[0]);
      data.photo = uploadedFileURL;
    } else {
      return res.status(400).send({
        status: false,
        message: "profileImage is required.",
      });
    }


        
        let userData = await studentModel.create(data)
        return res.status(201).send({ status: true, msg: "student registered successfully", data: userData })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
}
}

const loginUser = async function (req, res) {
    try {
        let mobile = req.body.mobile
        let password = req.body.password
        if (!isValid(mobile) || !isValid(password)) {
            return res.status(400).send({ status: false, data: "please enter phone and password" })
        }

        if (!regexPhone.test(mobile)) return res.status(400).send({ status: false, data: "please enter valid phone" })
        if (!regexPassword.test(password)) {
            return res.status(400).send({ status: false, data: "please enter valid password" })
        }
        const match = await bcrypt.compare(password, student.password);
        if (!match) {
          return res.status(400).json({ message: 'Invalid mobile number or password' });
        }

        if (!checkPassword) return res.status(400).send({ status: false, message: "Incorrect Password" })
      

        const login = await studentModel.findOne({ mobile:mobile, password: password })
        if (!login) {
            return res.status(404).send({ status: false, message: "phone or password is incorrect" })
        } else {
            const token = jwt.sign({
                userId: login._id.toString(),
            }, "rannlabs", { expiresIn: '1m' });
            return res.status(200).send({ status: true, data: token })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, err: err.message })
    }
}

module.exports={register,loginUser};