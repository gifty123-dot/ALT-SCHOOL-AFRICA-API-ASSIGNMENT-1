
const http = require('http');
const fs = require('fs'); 
const path = require('path');

const PORT = 3000;

const server = http.createServer((request, response) => {
    console.log(`Someone visited: ${request.url}`);
    let filePath = request.url;
    if (filePath === '/') {
        filePath = '/index.html';
    }
    const fullPath = '.' + filePath;
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`File not found: ${fullPath}`);
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - Page Not Found</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            text-align: center; 
                            background-color: #f0f0f0;
                            padding: 50px;
                        }
                        h1 { color: #ff6b6b; }
                        p { color: #666; }
                    </style>
                </head>
                <body>
                    <h1>404 - Oops! Page Not Found</h1>
                    <p>The page you're looking for doesn't exist.</p>
                    <p>You tried to visit: ${filePath}</p>
                    <a href="/index.html">Go back to home page</a>
                </body>
                </html>
            `);
        } else {
            fs.readFile(fullPath, (err, data) => {
                if (err) {
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end('Internal Server Error');
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data);
                }
            });
        }
    });
});
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Visit http://localhost:${PORT}/index.html to view my first alt school project!`);
});