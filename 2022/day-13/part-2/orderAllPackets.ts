import { readFileSync } from "fs";
import { compareTerms } from "../part-1/countOrderedPackets";

const packetLines: string[] = readFileSync('../input.txt', 'utf-8').split('\n');
const twoPacket = [[2]];
const sixPacket = [[6]];
const packets: any[][] = [
    twoPacket,
    sixPacket
];

for (let packet of packetLines) {
    if (packet != '') {
        packets.push(JSON.parse(packet));
    }
}

packets.sort((p1, p2) => {
    return compareTerms(p1, p2);
})

const dividerIndices: number[] = [];
for (let i = 0; i < packets.length; i++) {
    if (packets[i] == twoPacket || packets[i] == sixPacket) {
        dividerIndices.push(i + 1);
        if (dividerIndices.length == 2) {
            break;
        }
    }
}

console.log(`Decoder key: ${dividerIndices[0] * dividerIndices[1]}`);