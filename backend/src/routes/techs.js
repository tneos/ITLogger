const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");

const Techs = require("../models/Techs");

// @desc    Get all logs
router.get("/", async (req, res) => {
  try {
    // Get all logs
    let techsData = await Techs.find({});

    res.json({
      status: "success",
      techsData,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @desc    Add new log
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

      //   const payload = {
      //     user: {
      //       id: user.id,
      //     },
      // };
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
