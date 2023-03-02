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
 *  /user/login:
 *      post:
 *          summary: LOGIN
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

router.post("/login", UserAuthController.login);
module.exports={
    AuthRoutes: router
}