const mongoose = require('mongoose');
const isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false//.trim() :remove spaces, should not mistake empty space as value
   
    return true
}

const isVaildfile = (image)=>{
    let pattern = ("[^\\s]+(.*?)\\.(jpg|jpeg|png|JPG|JPEG|PNG)$")
    return image.match(pattern)
}

    const regexName = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/
const regexEmail = /^\s*[a-zA-Z0-9]+([\.\-\_\+][a-zA-Z0-9]+)*@[a-zA-Z]+([\.\-\_][a-zA-Z]+)*(\.[a-zA-Z]{2,3})+\s*$/
const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
const regexPhone = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
module.exports={isValid,isVaildfile,regexName,regexEmail,regexPassword,regexPhone}