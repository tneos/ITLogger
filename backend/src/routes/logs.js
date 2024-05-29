const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");

const Log = require("../models/Logs");

// @desc    Get all logs or logs that match query
router.get("/", async (req, res) => {
  console.log("Testing logs..");
  const query = req.query.q;
  let logsData;

  try {
    if (req.query.q) {
      logsData = await Log.find({
        $or: [
          {
            message: {$regex: query, $options: "i"},
          },
          {tech: {$regex: query, $options: "i"}},
        ],
      });
    } else {
      logsData = await Log.find({});
    }
    console.log(logsData);

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
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {id, message, attention, tech, date} = req.body;

    try {
      let log = new Log({
        id,
        message,
        attention,
        tech,
        date,
      });

      await log.save();
      res.json({
        id,
        message,
        attention,
        tech,
        date,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @desc    Update log
router.put("/:id", async (req, res) => {
  const doc = await Log.findByIdAndUpdate({_id: req.params.id}, req.body, {
    new: true,
  });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404)); // return function immediately before it moves to next one
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

// @desc    Delete log
router.delete("/:id", async (req, res) => {
  const logId = req.params.id;

  const deletedLog = await Log.findOneAndDelete({_id: logId});

  if (!deletedLog) {
    return next(new AppError("No log found with that ID", 404));
  }

  res.json({
    status: "success",
    data: null,
  });
});

module.exports = router;
