const express = require('express')

const app = express()



app.use('/users', (req, res, next) => {
    console.log('Second Middleware')
    res.send('<p> User solved (almost!) </p>')
})

app.use('/', (req, res, next) => {
    console.log('First Middleware')
    res.send('<p> General solved (almost!) </p>')
    
})

app.listen(3000)