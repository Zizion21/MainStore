const { HomeRoutes } = require("./api");
const { AuthRoutes } = require("./user/auth");

const router= require("express").Router();
router.use("/user", AuthRoutes)
router.use("/", HomeRoutes)

module.exports={
    AllRoutes: router
}