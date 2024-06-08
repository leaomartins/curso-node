import { Readable, Writable } from 'node:stream'

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

class MultiPlyByTwoStream extends Writable {
    _write(chunk, encoding, callback) {
        const number = parseInt(chunk.toString());
        const result = number * 2;
        console.log(`Double of ${number} is ${result}`);
        callback();
    }
}

new OneToHundredStream().pipe(new MultiPlyByTwoStream());