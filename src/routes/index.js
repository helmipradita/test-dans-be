const express = require('express');
const router = express.Router();

const usersControllers = require('../routes/users');
const jobsControllers = require('../routes/jobs');

router.use('/users', usersControllers);
router.use('/jobs', jobsControllers);

module.exports = router;
