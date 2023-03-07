const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { AuthRoutes } = require("./user/auth");

const router= require("express").Router();
router.use("/user", AuthRoutes)
router.use("/developer", DeveloperRoutes)
router.use("/admin", AdminRoutes)
router.use("/", HomeRoutes)

module.exports={
    AllRoutes: router
}