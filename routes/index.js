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

    // const topRestaurants = await db.Rating.findAll({
    //   where: {
    //     rating: [4, 5]

    //   }
    // })

    const restaurants = await db.Restaurant.findAll();

    // const topRatingsId = topRestaurants.map(rating => rating.restaurantId)
    // const filteredTopIds = topRatingsId.filter((id, i) => {
    //   return topRatingsId.indexOf(id) === i;
    // })
   
    // console.log(topRestaurants[0])
    const currentUser = visited[0]
    const visitedRestaurants = visited[0].visited
    const wantToVisit = visited[0].Restaurants
    
    // visitedRestaurants.forEach(visited => console.log(visited.name))
    const visitedRendered = [];
    const wantToVisitRendered = []
    const topRendered = [];
    for(let i = 0; i < visitedRestaurants.length && i < 3; i++) {
      visitedRendered.push(visitedRestaurants[i])
    }

    for(let i = 0; i < wantToVisit.length && i < 3; i++) {
      wantToVisitRendered.push(wantToVisit[i])
    }
    
    for(let i = 0; i < restaurants.length; i++) {
      const restaurantId = restaurants[i].id
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

      const restaurantRating = Math.floor(totalRating / counter)

      if(restaurantRating >= 4 && !(topRendered.includes(restaurants[i].name))) {
        topRendered.push(restaurants[i])
      }
    }) }

     const topRatingsId = topRendered.map(restaurant => restaurant.id)
    const filteredTopIds = topRatingsId.filter((id, i) => {
      return topRatingsId.indexOf(id) === i;
    })

    console.log(filteredTopIds)

    const currentTop = await db.Restaurant.findAll({
      where: {
        id: [...filteredTopIds]
      }
    })

    console.log(currentTop)
    

    res.render("index", {
      currentUser,
      visitedRendered,
      wantToVisitRendered,
      currentTop,
    });
  })
);

module.exports = router;
