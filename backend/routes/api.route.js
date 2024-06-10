const router = require("express").Router();
const { google } = require("googleapis");

const REFRESH_TOKEN = "";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

// create route for token
router.post("/create-tokens", async (req, res, next) => {
  try {
    const { code } = req.body;

    console.log(code);
    const response = await oauth2Client.getToken(code);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

// create event
router.post("/create-event", async (req, res, next) => {
  try {
    const { summary, description, location, startTime, endTime } = req.body;
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const calendar = google.calendar({ version: "v3" });

    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: "primary",
      requestBody: {
        summary,
        description,
        location,
        attendees: [
          { email: "abubakkarmit@gmail.com" },
          { email: "abubakkarunaz@gmail.com" },
          { email: "abubakkar.bsse3866@iiu.edu.pk" },
        ],
        start: {
          dateTime: new Date(startTime),
        },
        end: {
          dateTime: new Date(endTime),
        },
      },
    });

    res.send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
