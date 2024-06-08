import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1;

    _read() {

        setTimeout(() => {

            const i = this.index++;
            if (i > 100) {
                this.push(null);
            } else {
                this.push(`${i}\n`);
            }
        }, 1000);

    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = parseInt(chunk.toString());
        const result = number * -1;
        callback(null, `${result}\n`);
    }
}

class MultiPlyByTwoStream extends Writable {
    _write(chunk, encoding, callback) {
        const number = parseInt(chunk.toString());
        const result = number * 10;
        console.log(`Double of ${number} is ${result}`);
        callback();
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiPlyByTwoStream());