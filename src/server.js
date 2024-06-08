import { createServer } from 'http';
import { json } from './middlewares/json.js';

const users = [];

const server = createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res);

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body;

        users.push({
            id: 1,
            name,
            email,
        })
        return res.writeHead(201).end();
    }

    if (method === 'GET' && url === '/users') {
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
