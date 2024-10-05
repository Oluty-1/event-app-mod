const router = require("express").Router();
const auth = require("../../middleware/auth");
const Event = require("../../Model/EventSchema");

router.get("/one-event/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById({ _id: req.params.id });
    if (!event) {
      return res.status(400).json({ msg: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    return res.status(500);
  }
});

module.exports = router;
