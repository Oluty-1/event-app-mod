const router = require("express").Router();
const auth = require("../../middleware/auth");
const Event = require("../../Model/EventSchema");

router.put("/update-event/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });

    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
