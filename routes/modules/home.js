const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

//get frontpage
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => { res.render('index', { restaurants }) })
    .catch(error => console.error(error))
})

//search restaurants
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const sort = req.query.sort
  const sortBy = sort.split("-")
  const type = sortBy[0]
  const order = sortBy[1]
  const userId = req.user._id

  Restaurant.find({ userId })
    .lean()
    .sort({ [type]: order })
    .then(restaurant => {
      let restaurants = restaurant.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLocaleLowerCase()) || restaurant.category.includes(keyword))
      return res.render('index', { restaurants, keyword, sort })
    })
    .catch(error => console.error(error))
})

module.exports = router