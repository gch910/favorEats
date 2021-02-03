const express = require("express");
const router = express.Router();
const { restoreUser } = require("../auth");
const db = require("../db/models");
const { asyncHandler } = require("./utils");

/* GET home page. */
router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    // console.log(req.session);
    const user = req.session.auth.userId;
    // want to be querying into user and not restaurant - because we have the user id from req.session.auth
    const visited = await db.User.findAll({
      include: db.Restaurant,
      //not sure about everything below!
      where: {
        id: user,
      },
    });
    //needed to console.log to see object so we know what to key into
    const restaurants = visited[0].Restaurants
    
    // console.log(visited[0].Restaurants.name);

    res.render("index", {
      title: "a/A Express Skeleton Homes",
      restaurants
    });
  })
);

module.exports = router;
