const fs = require('fs')
const users = []
const requestHandler = (req, res) => {
    const url = req.url
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Assignment 1</title></head>')
        res.write(
            '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
        )
        res.write('</html>')
        return res.end()
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Assignment 1</title></head>')
        res.write(`<body>`)
        res.write('<ul>')

        users.map(user => {
            res.write(`<li>${user}</li>`)
        })

        res.write('</ul>')
        res.write(`</body>`)

        console.log(users)
        res.write('<a href="/">Back to add user</a>')
        res.write('</html>')
        return res.end()
    }
    // Send a HTML response with some "Page not found text
    if (url === '/create-user') {
        const body = []
        req.on('data', chunk => {
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            users.push(parsedBody.split('=')[1])
            console.log(parsedBody.split('=')[1]) // username=whatever-the-user-entered
            return res.end()
        })
        res.statusCode = 302
        res.setHeader('Location', '/users')
        res.end()
    }
}


module.exports.handler = requestHandler