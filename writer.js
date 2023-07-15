async function write() {
    const writer = port.writable.getWriter();
    var b = new Uint8Array(rows*columns*3+3).fill(0);
    for(var i=0; i<buff.length; i++){
        b[i] = (buff[i]*brightness)/100;
    }

    const one = b.slice(0,7*3);
    const two = b.slice(7*3,14*3);
    var reversedTwo = [];
    for (let i = 0; i < two.length; i += 3) {
        let pack = two.slice(i, i + 3);
        pack.reverse();
        reversedTwo.push(...pack);
    }
    const three = b.slice(14*3,21*3);
    const four = b.slice(21*3,28*3);
    var reversedFour = [];
    for (let i = 0; i < four.length; i += 3) {
        let pack = four.slice(i, i + 3);
        pack.reverse();
        reversedFour.push(...pack);
    }
    const five = b.slice(28*3,35*3);
    const six = b.slice(35*3,42*3);
    var reversedSix = [];
    for (let i = 0; i < six.length; i += 3) {
        let pack = six.slice(i, i + 3);
        pack.reverse();
        reversedSix.push(...pack);
    }

    const complete = new Uint8Array(42 * 3 + 3);
    let offset = 0;

    complete.set(one, offset);
    offset += one.length;
    complete.set(reversedTwo.reverse(), offset);
    offset += two.length;
    complete.set(three, offset);
    offset += three.length;
    complete.set(reversedFour.reverse(), offset);
    offset += four.length;
    complete.set(five, offset);
    offset += five.length;
    complete.set(reversedSix.reverse(), offset);
    offset += six.length;
    complete.set(lastLED, offset);


    writer.write(complete);
    writer.releaseLock();
}