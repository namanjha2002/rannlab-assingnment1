const express = require('express')
const router = express.Router()
const userController = require('../controller/studentController')

router.get('/test', function(req, res){
    return res.send({status: true, msg: "running"})
})

router.post('/register', userController.register)

router.post("/loginUser", userController.loginUser)


module.exports = router