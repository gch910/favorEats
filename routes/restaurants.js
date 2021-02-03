const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const { loginUser, logoutUser } = require("../auth");
const { csrfProtection, asyncHandler } = require("./utils");
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


  //GET route for 'want-to-visit' restaurants
router.get(
  "/want-to-visit",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const currentUser = visited[0];
    const wantToVisit = visited[0].Restaurants;

    res.render("want-to-visit", {
      currentUser,
      wantToVisit,
    });
  })
);

router.get('restaurants/:id', asyncHandler(async(req, res) => {
    
}))

module.exports = router;

   




