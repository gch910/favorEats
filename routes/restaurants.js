const express = require("express");
const router = express.Router();
const { requireAuth } = require("../auth");
const { asyncHandler } = require("./utils");
const db = require("../db/models");

router.get('/visited', requireAuth, asyncHandler(async(req, res) => {
    const user = req.session.auth.userId;
    const visited = await db.User.findAll({
      include: [db.Restaurant, { model: db.Restaurant, as: "visited" }],
      where: {
        id: user,
      },
    });

    const visitedRestaurants = visited[0].visited

    res.render('visited', {
        visitedRestaurants

    })
}));


router.get('restaurants/:id', asyncHandler(async(req, res) => {
    
}))

module.exports = router;