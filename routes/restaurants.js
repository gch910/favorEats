const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require("../auth");
const { loginUser, logoutUser } = require("../auth");
const { csrfProtection, asyncHandler } = require("./utils");
const db = require("../db/models");

router.get(
  "/visited",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.session.auth.userId;
    const visited = await db.User.findAll({
      include: [db.Restaurant, { model: db.Restaurant, as: "visited" }],
      where: {
        id: user,
      },
    });
    const visitedRestaurants = visited[0].visited;

    res.render("visited", {
      visitedRestaurants,
    });
  })
);

//GET route for 'want-to-visit' restaurants
router.get(
  "/want-to-visit",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const user = req.session.auth.userId;
    const wantVisit = await db.User.findAll({
      include: [db.Restaurant, { model: db.Restaurant, as: "visited" }],
      where: {
        id: user,
      },
    });

    const currentUser = wantVisit[0];
    const wantToVisit = wantVisit[0].Restaurants;

    res.render("want-to-visit", {
      currentUser,
      wantToVisit,
    });
  })
);

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const restaurants = await db.Restaurant.findAll();

    const showRestaurants = restaurants;

    res.render("restaurants", {
      showRestaurants,
    });
  })
);

router.get(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId
    const notSure = db.User.build();
    const restaurantId = req.params.id;
    const restaurant = await db.Restaurant.findByPk(restaurantId, {
      include: [db.Comment, db.Rating]
    });

    // const users = await db.User.findAll({
    //   include: db.Comment
    // })
    
    // console.log(users[0].Comments)
    const restaurantComments = restaurant.Comments; //[0].comment
    const restaurantRatings = restaurant.Ratings;
    
    // console.log(restaurantRatings[0].rating)

    res.render("current-restaurant", {
      restaurant,
      restaurantComments,
      restaurantRatings,
    });
  })
);

router.post('/comment', asyncHandler(async (req, res) => {
    const { comment, restaurantId, rating } = req.body;
    const userId = req.session.auth.userId;

    // const parsedUserId = parseInt(userId, 10)
    const userRating = await db.Rating.create({
      rating,
      restaurantId,
      userId,
    })

    const allRatings = await db.Rating.findAll({
      where: {
        restaurantId,
      }
    })

    const ratings = allRatings.map(rating => {
      if(rating.rating) {
        return rating.rating
      }})
    let totalRating = 0;
    let counter = 0;
    ratings.forEach((rating) => {
      counter++;
      const parsedRating = parseInt(rating, 10)
      if(rating !== undefined) {
        totalRating += parsedRating
      }
     
    });
    const restaurantRating = Math.floor(totalRating / counter)
    console.log(restaurantRating)
    

    const userComment = await db.Comment.create({
      comment,
      restaurantId,
      userId,
    })
   
    console.log("inside router")
    res.json({ comment, restaurantId, rating })
}))

module.exports = router;
