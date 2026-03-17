import { getText } from "./loader.js";
import { mapFreq } from "./frequency.js";
import { buildHuffmanTree, buildCodeMap, encode, decode } from "./huffman.js";

const path = "../samples/sample.txt";
const text = getText(path);

const root = buildHuffmanTree(mapFreq(text));

const codeMap = buildCodeMap(root);
const encoded = encode(text, codeMap);
const decoded = decode(encoded, root);

// Stats
const originalBits = text.length * 8;
const compressedBits = encoded.length;
const compressionRatio = (originalBits / compressedBits).toFixed(2);
const saving = ((1 - compressedBits / originalBits) * 100).toFixed(2);

console.log("-".repeat(50));
console.log("CODE TABLE");
console.log("-".repeat(50));

for (const [char, code] of codeMap) {
    console.log(`'${char === "\n" ? "\\n" : char}' -> ${code}`);
}

console.log();
console.log("-".repeat(50));
console.log("FILE STATISTICS");
console.log("-".repeat(50));

console.log(`Original: ${originalBits} bits`);
console.log(`Compressed: ${compressedBits} bits`);
console.log(`Compression Ratio: ${compressionRatio}`);
console.log(`Savings: ${saving}%`);
console.log(`Integrity check: ${decoded === text ? "PASSSED" : "FAILED"}`);
