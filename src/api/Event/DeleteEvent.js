const router = require("express").Router();
const auth = require("../../middleware/auth");
const Event = require("../../Model/EventSchema");

router.delete("/delete-event/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Event not found" });
    }
    res.status(500);
  }
});

module.exports = router;
