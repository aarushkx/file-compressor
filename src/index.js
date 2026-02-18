import { getText } from "./loader.js";
import { mapFreq } from "./frequency.js";

const path = "../samples/sample.txt";
const text = getText(path);
const freq = mapFreq(text);

console.log(freq);
