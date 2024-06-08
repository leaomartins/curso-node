import { createServer } from 'http';


const users = [];


const server = createServer(async (req, res) => {

    const { method, url } = req;

    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try {
        var body = JSON.parse(Buffer.concat(buffers).toString());
    } catch (error) {
        res.writeHead(400).end();
        return;
    }

    if (req.method === 'POST' && req.url === '/users') {
        const { name, email } = body;

        users.push({
            id: users.length + 1,
            name,
            email

        })
        return res.writeHead(201).end();
    }

    if (req.method === 'GET' && req.url === '/users') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users));
        return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, world!');
});

server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000/');
})
