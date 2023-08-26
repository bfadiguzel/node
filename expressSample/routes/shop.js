const path = require('path')
const rootDir = require('../utill/path')
const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    console.log('in another middleware!')
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
})

module.exports = router