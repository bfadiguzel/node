const express = require('express')
const router = express.Router()
const {users} = require('./admin')

router.get('/', (req, res, next) => {
    console.log("You are in the Show Users page")
   // console.log(users)
    res.render('show-user', { pageTitle: 'Show Users', path: '/' , users: users})
})


exports.router = router