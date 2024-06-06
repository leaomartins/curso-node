import { createServer } from 'http';


const users = [
    {
        id: 1,
        name: 'Alice'
    },

    { id: 2, name: 'Bob' }
];


const server = createServer((req, res) => {

    if (req.url === '/users') {
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
