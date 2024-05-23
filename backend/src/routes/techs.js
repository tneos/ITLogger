const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");

const Tech = require("../models/Techs");

// @desc    Get all techs
router.get("/", async (req, res) => {
  try {
    // Get all logs
    let techsData = await Tech.find({});

    res.json({
      status: "success",
      techsData,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @desc    Add new tech
router.post(
  "/",
  [
    check("firstName", "Please add first name").not().isEmpty(),
    check("lastName", "Please add last name").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {firstName, lastName} = req.body;

    try {
      let log = new Tech({
        firstName,
        lastName,
      });

      await log.save();
      res.json({
        firstName,
        lastName,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @desc    Delete log

router.delete("/:id", async (req, res) => {
  const logId = req.params.id;

  const doc = await Tech.findOneAndDelete({_id: logId});

  if (!doc) {
    return next(new AppError("No technician found with that ID", 404));
  }

  res.json({
    status: "success",
    data: null,
  });
});

module.exports = router;
