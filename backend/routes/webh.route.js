const express = require("express");
const router = express.Router();

router.post("/webhook", async (req, res, next) => {
  console.log("object");
  try {
    console.log("Webhook called:", req.body);

    const notification = req.body;

    // Handle the notification
    if (
      notification.resourceState === "exists" ||
      notification.resourceState === "sync"
    ) {
      // get event details
      const { id } = notification;

      const event = await calendar.events.get({
        calendarId: "primary",
        eventId: id,
      });

      console.log("Event details:", event.data);
    } else {
      console.log("Unknown notification type received");
    }

    res.sendStatus(200); // Acknowledge the notification
  } catch (error) {
    next(error);
  }
});

module.exports = router;
