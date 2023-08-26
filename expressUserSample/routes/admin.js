const express = require('express')
const router = express.Router()

const users = []

router.get('/add-user', (req, res, next) => {
    console.log("You are in the add-user page")
    res.render('add-user', { pageTitle: 'Add User', path: '/admin/add-user' })
})

router.post('/add-user', (req, res, next) => {
    users.push({ 'userName': req.body.userName })
    res.redirect('/')
    console.log('new user added')
})




exports.router = router
exports.users = users