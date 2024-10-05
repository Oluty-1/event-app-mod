const router = require("express").Router();
const Event = require("../../Model/EventSchema");
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

router.post(
  "/new-event",
  auth,
  [
    body("eventName", "Event name is required").not().isEmpty(),
    body("eventDate", "Event price is required").not().isEmpty(),
    body("eventDescription", "Event description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const event = new Event({
        user: req.user,
        eventName: req.body.eventName,
        eventDate: req.body.eventDate,
        eventDescription: req.body.eventDescription,
      });

      const savedEvent = await event.save();
      res.status(200).json(savedEvent);
    } catch (err) {
      return res.status(500);
    }
  }
);

module.exports = router;
