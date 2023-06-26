const router = require("express").Router();

// Costumer router
const costumerRouter = require("./costumer")
// Resources router
const resourcesRouter = require("./resources")

router.use("/", resourcesRouter, costumerRouter)

module.exports = router;