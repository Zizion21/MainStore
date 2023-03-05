const { UserModel } = require("../models/users")
const JWT= require("jsonwebtoken");
const createError= require("http-errors");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constants");
const redisClient = require("./init_redis");

function randomNumberGenerator(){
    return Math.floor((Math.random() * 90000) + 1000)
}

function SignAccessToken(userId){
    return new Promise( async(resolve, reject)=>{
        const user= await UserModel.findById(userId);
        const payload= {
            mobile: user.mobile        }
        const options={
            expiresIn : "1h"
        }
        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token)=> {
            if(err) reject(createError.InternalServerError("Server Error ⚠️"))
            resolve(token)
        })
    })
}

function SignRefreshToken(userId){
    return new Promise( async(resolve, reject)=>{
        const user= await UserModel.findById(userId);
        const payload= {
            mobile: user.mobile        }
            const options={
                expiresIn : "1y"
            }
        JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, async(err, token)=> {
            if(err) reject(createError.InternalServerError("Server Error ⚠️"));
            // await redisClient.SET(String(userId), token)
            // await redisClient.EXPIRE(String(userId), (365*24*60*60))
            await redisClient.SETEX(String(userId), (365*24*60*60), token)
            resolve(token)
        })
    })
}

function verifyRefreshToken(token){
    return new Promise((resolve, reject)=> {
        JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async(err, payload)=>{
            if(err) reject(createError.Unauthorized("Log into your account...☠️"));
            const {mobile}= payload || {};
            const user= await UserModel.findOne({mobile}, {password: 0, otp: 0});
            if(!user) reject(createError.Unauthorized("Acount not found...❌"));
            const refreshToken= await redisClient.get(String(user?._id));
            if(token === refreshToken) return resolve(mobile);
            reject(createError.Unauthorized("Failed to relogin 😐"));
        })
    })
}

module.exports={
    randomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    verifyRefreshToken,
}