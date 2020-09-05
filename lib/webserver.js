import http from 'http' // Import Node.js core module

const server = http.createServer(function (req, res) {   //create web server
  if (req.url == '/') { //check the URL of the current request

    // set response header
    res.writeHead(200, { 'Content-Type': 'text/html' })

    // set response content
    res.write('<html><body><p>This is home Page.</p></body></html>')
    res.end()
    console.log('loaded the homepage')

  }
  else if (req.url == '/student') {

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<html><body><p>This is student Page.</p></body></html>')
    res.end()

  }
  else if (req.url == '/admin') {

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<html><body><p>This is admin Page.</p></body></html>')
    res.end()

  }
  else
    res.end('Invalid Request!')

})


export { server }
export default server

// server.listen(5000) //6 - listen for any incoming requests
