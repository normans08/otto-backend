const router = require("express").Router();
const controller = require("../controller/controller");

router.post("/transcribeGpt", async (req, res) => {
  let result = await controller.transcribeGpt(req, res);
  res.send(result);
});

router.post("/transcribe", async (req, res) => {
  await controller
    .getTranscript(req, res)
    .then((transcriptObj) => res.send(transcriptObj))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
