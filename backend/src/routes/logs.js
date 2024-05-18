const express = require("express");
const router = express.Router();

const Logs = require("../models/Logs");

// @desc    Get all logs
router.get("/", async (req, res) => {
  try {
    // Get all logs
    let logsData = await Logs.find({});

    res.json({
      status: "success",
      logsData,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @desc    Add new log
router.post(
  "/",
  [
    check("message", "Please add message").not().isEmpty(),
    check("tech", "Please add tecnician's name").not().isEmpty(),
    check("date", "Please add a valid date").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {message, attention, tech, date} = req.body;

    try {
      let log = new Log({
        message,
        attention,
        tech,
        date,
      });

      await log.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
