const express = require('express');
const router = express.Router();

// models
const { User, Exercise } = require('../models');

router.post('/new-user', async (req, res) => {
  const { username } = req.body;

  try {
    await User.create({ username: username });

    const user = await User.findOne({ username: username }, '_id username');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).send('Username already taken');
  }
});

router.get('/users', async (req, res) => {
  const users = await User.find({}, { username: 1 });
  res.json(users);
});

router.get('/log', async (req, res) => {
  const { userId, from, to, limit } = req.query;

  const dateFilter = {
    ...(from && { $gte: new Date(from) }),
    ...(to && { $lte: new Date(to) }),
  };

  const filter = {
    ...(userId && { user: userId }),
    ...(Object.keys(dateFilter).length && { date: dateFilter }),
  };

  try {
    const query = Exercise.find(filter, '_id description duration date').sort({
      date: -1,
    });

    const exercises = await (limit ? query.limit(Number(limit)) : query);

    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

router.post('/add', async (req, res) => {
  const { userId, description, duration, date } = req.body;

  try {
    await Exercise.create({
      user: userId,
      description: description,
      duration: duration,
      ...(date && { date: new Date(date) }),
    });

    const exercises = await Exercise.find(
      { user: userId },
      '_id description duration date'
    ).sort({ date: -1 });

    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

module.exports = router;
