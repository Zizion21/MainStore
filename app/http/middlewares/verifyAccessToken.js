const createError= require("http-errors");
const JWT= require("jsonwebtoken");
const { UserModel } = require("../../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constants");

function verifyAccessToken(req, res, next){
    const headers= req.headers;
    const [bearer, token]= headers?.["access-token"]?.split(" ") || [];
    if( token && ["bearer", "Bearer"].includes(bearer)){
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async(err, payload)=>{
            if(err) return next(createError.Unauthorized("Log into your account...☠️"));
            const {mobile}= payload || {};
            const user= await UserModel.findOne({mobile}, {password: 0, otp: 0});
            if(!user) return next(createError.Unauthorized("Acount not found...❌"));
            req.user= user;
            return next();
        })
    }
    else return next(createError.Unauthorized("Plaese log into your account."))
}

module.exports={
    verifyAccessToken
}