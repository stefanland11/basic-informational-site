const path = require('path');
const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    let contentType = 'text/html'

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if(err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            }
            else {
                //some server error
                res.writeHead(500);
                res.end('Server Error: ' + err.code);
            
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType} );
            res.end(content, 'utf-8');
            console.log('ran');
            
        }
    })

});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
})