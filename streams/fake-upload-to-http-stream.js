import { Readable } from 'stream';

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

fetch('http://localhost:3001', {
    method: 'POST',
    body: new OneToHundredStream()
}).then(res => res.text()).then(console.log);