const express = require("express");
const router = express.Router();
const { requireAuth } = require("../auth");
const db = require("../db/models");
const { asyncHandler } = require("./utils");

/* GET home page. */
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const user = req.session.auth.userId;
    const visited = await db.User.findAll({
      include: [db.Restaurant, { model: db.Restaurant, as: "visited" }],
      where: {
        id: user,
      },
      order: ['updatedAt'],
    });


    const currentUser = visited[0]
    const visitedRestaurants = visited[0].visited
    const wantToVisit = visited[0].Restaurants
    console.log(visited[0])
    
    console.log(visitedRestaurants)

    res.render("index", {
      currentUser,
      visitedRestaurants,
      wantToVisit
    });
  })
);

module.exports = router;
