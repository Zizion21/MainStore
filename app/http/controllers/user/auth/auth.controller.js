const createError= require("http-errors");
const { UserModel } = require("../../../../models/users");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constants");
const { randomNumberGenerator, SignAccessToken, SignRefreshToken, verifyRefreshToken } = require("../../../../utils/functions");
const { getOtpSchema, checkOtpSchema } = require("../../../validators/user/auth.schema");
const Controller = require("../../controller");

class UserAuthController extends Controller{
    async getOtp(req, res, next){
        try {
            await getOtpSchema.validateAsync(req.body);
            const {mobile}= req.body;
            const code= randomNumberGenerator();
            const result= await this.saveUser(mobile, code);
            if(!result) throw createError.Unauthorized("Failed to log in ❌")
            return res.status(200).send({
                statusCode: 200,
                message: "OTP sent successfully 📤",
                code,
                mobile
            });
        } catch (error) {
            next(error)
        }
    }

    async checkOtp(req, res, next){
        try {
            const {mobile, code}= req.body;
            await checkOtpSchema.validateAsync(req.body);
            const user= await UserModel.findOne({mobile});
            if(!user) throw createError.NotFound("User not found❗");
            if(user.otp.code != code) throw createError.Unauthorized("Code is not correct.");
            const now= Date.now();
            if(user.otp.expiresIn < now ) throw createError.Unauthorized("Code has been expired ⛔");
            const accessToken= await SignAccessToken(user._id);
            //ok
            const refreshToken= await SignRefreshToken(user._id);
            return res.json({
                data:{
                    accessToken,
                    refreshToken
                }
            })

            
        } catch (error) {
            next(error)
        }
    }

    async refreshToken(req, res, next){
        try {
            const {refreshToken}= req.body;
            const mobile= await verifyRefreshToken(refreshToken);
            const user= await UserModel.findOne({mobile});
            const accessToken= await SignAccessToken(user._id);
            const newRefreshToken= await SignRefreshToken(user._id);
            return res.json({
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            })
            
        } catch (error) {
            next(error)
        }
    }

    async checkUserExistment(mobile){
        const user= await UserModel.findOne({mobile});
        return !!user
    }

    async updateUser(mobile, objectData= {}){
        Object.keys(objectData).forEach(key=>{
            if(["", " ", "0", 0, NaN, undefined, null].includes(objectData[key])) delete objectData[key]
        })
        const updateResult= await UserModel.updateOne({mobile}, {$set: objectData});
        return !!updateResult.modifiedCount
    }

    async saveUser(mobile, code){
        let otp= {
            code,
            expiresIn: (new Date().getTime() + 120000)
        }
        const result= await this.checkUserExistment(mobile);
        if(result) return this.updateUser(mobile, {otp})
        else return !!(await UserModel.create({mobile, otp, roles: [USER_ROLE]}))
    }
}

module.exports={
    UserAuthController: new UserAuthController()
}