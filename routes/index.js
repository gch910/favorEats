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
    });

    const topRestaurants = await db.Rating.findAll({
      include: db.Restaurant,
      where: {
        rating: [4, 5]

      }
    })
    const highestRated = topRestaurants
    // console.log(topRestaurants[0])
    const currentUser = visited[0]
    const visitedRestaurants = visited[0].visited
    const wantToVisit = visited[0].Restaurants
   
    
    

    res.render("index", {
      currentUser,
      visitedRestaurants,
      wantToVisit,
      highestRated
    });
  })
);

module.exports = router;
