const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller");

const router= require("express").Router();
/**
 * @swagger
 * tags:
 *  name: UserAuth
 *  description: User Authentication Section
 */
/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          summary: GET-OTP
 *          tags: [UserAuth]
 *          description: One Time Password Login.
 *          parameters:
 *          -   name: mobile
 *              in: formData
 *              type: string
 *              required: true
 *          responses:
 *              200:
 *                  description: Success
 *              201:
 *                  description: Created
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal server error
 *              
 */

router.post("/get-otp", UserAuthController.getOtp);
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          summary: CHECK-OTP
 *          tags: [UserAuth]
 *          description: Checking OTP
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              desciption: Enter the code you recieved.
 *              in: formData
 *              type: string
 *              required: true
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad request
 */
router.post("/check-otp", UserAuthController.checkOtp);
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [UserAuth]
 *          summary: Refresh Token
 *          description: New token and new refresh token.
 *          parameters:
 *              -   in: formData
 *                  required: true
 *                  type: string
 *                  name: refreshToken  
 *          responses:
 *              200:
 *                  description: Success
 */

router.post("/refresh-token", UserAuthController.refreshToken)
module.exports={
    AuthRoutes: router
}