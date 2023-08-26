const fs = require('fs')

const requestandler = (req, res) => {
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/> <button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    // process.exit()// close the server
    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            // console.log(chunk)
            body.push(chunk)
        })
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString()
            const message = parseBody.split('=')[1]
            //  console.log("Buffer.toString(): " + parseBody)
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            }) // this never block the server

        })

    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My Firs Page</title></head>')
    res.write('<body><h1>Hello :)</h1></body>')
    res.write('</html>')
    res.end()
}

module.exports = {
    handler:requestandler,
    text:'wooow'
}

/*
module.exports.handler = requestandler
module.exports.text = "wooow"

or

exports.handler = requestandler
exports.text = "wooow"
*/