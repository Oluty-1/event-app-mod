const { Schema, model, models } = require("mongoose");

const EventSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      require: true,
    },
    eventDate: {
      type: Date,
      require: true,
    },
    eventDescription: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = models.Event || model("Event", EventSchema);
