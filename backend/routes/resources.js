const router = require("express").Router();

const resourcesController = require("../controllers/resourcesController");

router
    .route("/resources")
    .post((req, res) => resourcesController.create(req, res));

router
    .route("/resources")
    .get((req, res) => resourcesController.getAll(req, res));

router
    .route("/resources/:id")
    .get((req, res) => resourcesController.get(req, res));

router
    .route("/resources/:id")
    .delete((req, res) => resourcesController.delete(req, res));

router
    .route("/resources/:id")
    .put((req, res) => resourcesController.update(req, res));



module.exports = router;