const router = require("express").Router();
const controller = require("../controller/controller");

router.post("/transcribeGpt", async (req, res) => {
  let result = await controller.transcribeGpt(req, res);
  res.send(result);
});

module.exports = router;
