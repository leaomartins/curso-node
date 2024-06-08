import http from 'node:http';
import { Transform } from 'node:stream';


class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = parseInt(chunk.toString());
        const result = number * -1;
        callback(null, `${result}\n`);
    }
}

const server = http.createServer((req, res) => {

    req.pipe(new InverseNumberStream()).pipe(res);

});
server.listen(3001, 'localhost', () => {
    console.log('Server running at http://localhost:3001/');
}); 
