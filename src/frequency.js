export function mapFreq(text) {
    let freq = new Map();

    for (const ch of text) {
        if (freq.has(ch)) freq.set(ch, freq.get(ch) + 1);
        else freq.set(ch, 1);
    }
    return freq;
}
