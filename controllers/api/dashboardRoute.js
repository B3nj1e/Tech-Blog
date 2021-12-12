const router = require('express').Router();
const { User } = require('../../models');
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/dashboard', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.getAll({
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('post', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
