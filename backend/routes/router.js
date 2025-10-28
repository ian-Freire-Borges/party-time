const router = require("express").Router();

const ServiceController = require("../controllers/serviceController");
const serviceRouter = require("./services");

router.use("/", serviceRouter);

router.route("/services").get((req, res) => ServiceController.getAll(req, res));

//parties routes
const partyRouter = require("./parties");

router.use("/", partyRouter);

module.exports = router;