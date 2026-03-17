import { Node, PriorityQueue } from "./priority-queue.js";

export function buildHuffmanTree(freqMap) {
    const pq = new PriorityQueue();

    for (const [char, freq] of freqMap) {
        pq.insert(new Node(char, freq));
    }

    // Edge case of only one unique char
    if (pq.size() === 1) {
        const only = pq.delete();
        const root = new Node(null, only.freq);
        root.left = only;
        return root;
    }

    while (pq.size() > 1) {
        const left = pq.delete();
        const right = pq.delete();

        const merged = new Node(null, left.freq + right.freq);
        merged.left = left;
        merged.right = right;

        pq.insert(merged);
    }
    return pq.delete();
}

function traverse(map, node, code) {
    if (!node.left && !node.right) {
        map.set(node.data, code);
        return;
    }
    if (node.left) traverse(map, node.left, code + "0");
    if (node.right) traverse(map, node.right, code + "1");
}

export function buildCodeMap(root) {
    if (!root) return new Map();
    const map = new Map();
    traverse(map, root, "");
    return map;
}

export function encode(text, codeMap) {
    let res = "";
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const code = codeMap.get(ch);
        res += code;
    }
    return res;
}

export function decode(bits, root) {
    let res = "";
    let curr = root;

    for (let i = 0; i < bits.length; i++) {
        if (bits[i] === "0") curr = curr.left;
        else curr = curr.right;

        if (!curr.left && !curr.right) {
            res += curr.data;
            curr = root;
        }
    }
    return res;
}
