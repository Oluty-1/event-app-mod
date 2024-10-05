const router = require("express").Router();
const Event = require("../../Model/EventSchema");
const auth = require("../../middleware/auth");

router.get("/my-events", auth, async (req, res) => {
  try {
    const event = await Event.find({ user: req.user });
    if (!event) {
      return res.status(400).json({ msg: "No events found" });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
