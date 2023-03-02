const createError= require("http-errors");
const { UserModel } = require("../../../../models/users");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constants");
const { randomNumberGenerator } = require("../../../../utils/functions");
const { authSchema } = require("../../../validators/user/auth.schema");
const Controller = require("../../controller");

class UserAuthController extends Controller{
    async login(req, res, next){
        try {
            await authSchema.validateAsync(req.body);
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
            next(createError.BadRequest(error.message))
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
            expiresIn: EXPIRES_IN
        }
        const result= await this.checkUserExistment(mobile);
        if(result) return this.updateUser(mobile, {otp})
        else return !!(await UserModel.create({mobile, otp, roles: [USER_ROLE]}))
    }
}

module.exports={
    UserAuthController: new UserAuthController()
}