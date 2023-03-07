const router= require("express").Router();
const bcrypt= require("bcrypt");
const { randomNumberGenerator } = require("../utils/functions");
/**
 * @swagger
 * tags:
 *  name: Developer-Routes
 *  description: Developer Utils
 */

/**
 * @swagger
 *  /developer/password-hash/{password}:
 *      get:
 *          summary: Hashing data with bcrypt
 *          tags: [Developer-Routes]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: password
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */
router.get("/password-hash/:password", (req, res, next)=>{
    const {password}= req.params;
    const salt= bcrypt.genSaltSync(10);
    return res.send(bcrypt.hashSync(password, salt));
});

/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          summary: Getting random numbers
 *          tags: [Developer-Routes]
 *          responses:
 *              200:
 *                  description: Success
 */

router.get("/random-number", (req, res, next)=>{
    return res.send(randomNumberGenerator().toString());

})

module.exports={
    DeveloperRoutes: router
}