const router = require("express").Router();

// Customer router
const customerRouter = require("./customer")
// Resources router
const resourcesRouter = require("./resources")

router.use("/", resourcesRouter, customerRouter)

module.exports = router;