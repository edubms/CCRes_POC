const router = require("express").Router();

const customerController = require("../controllers/customerController");

router
    .route("/customer")
    .get((req,res) => customerController.get(req,res))

module.exports = router;