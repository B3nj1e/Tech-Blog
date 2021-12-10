const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const profileRoute = require('./api/profileRoute')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoute);

module.exports = router;
