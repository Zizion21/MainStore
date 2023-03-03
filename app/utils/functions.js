const { UserModel } = require("../models/users")
const JWT= require("jsonwebtoken");
const createError= require("http-errors");
const { ACCESS_TOKEN_SECRET_KEY } = require("./constants");

function randomNumberGenerator(){
    return Math.floor((Math.random() * 90000) + 1000)
}

function SignAccessToken(userId){
    return new Promise( async(resolve, reject)=>{
        const user= await UserModel.findById(userId);
        const payload= {
            mobile: user.mobile,
            userID: user._id
        }
        const options={
            expiresIn : "1h"
        }
        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token)=> {
            if(err) reject(createError.InternalServerError("Server Error ⚠️"))
            resolve(token)
        })
    })
}
module.exports={
    randomNumberGenerator,
    SignAccessToken
}