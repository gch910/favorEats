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
    const visited = await db.Restaurant.findAll({
      include: db.User,
      //not sure about everything below!
      where: {
        id: user,
      },
    });
    // console.log(visited[0].VisitedRestaurant);

    res.render("index", {
      title: "a/A Express Skeleton Homes",
      visited,
    });
  })
);

module.exports = router;
