# File Compressor

A simple file compressor built on the fundamentals of [Huffman Coding](https://en.wikipedia.org/wiki/Huffman_coding).

---

## How Huffman Coding Works

Huffman Coding is a **lossless compression algorithm** that reduces data size by assigning variable-length binary codes to characters based on how often they appear.

Characters that appear more frequently are assigned shorter binary codes, while characters that appear less frequently are assigned longer binary codes.

## Example (`banana`)

### Frequency Count

Count how many times each character appears:

```
b → 1
a → 3
n → 2
```

---

### Build Min Heap (Priority Queue)

Insert all characters as nodes:

```
(b:1), (n:2), (a:3)
```

---

### Build Huffman Tree

Always combine the **two smallest frequencies**:

#### Step 1:

```
(b:1) + (n:2) → (3)
```

Tree:

```
   (*:3)
   /   \
 (b:1) (n:2)
```

#### Step 2:

```
(*:3) + (a:3) → (6)
```

Final Tree:

```
        (*:6)
       /     \
    (*:3)    (a:3)
    /   \
 (b:1) (n:2)
```

---

### Generate Codes

Traverse the tree assigning `0` to left child and `1` to right child:

```
b -> 00
n -> 01
a -> 1
```

---

### Encode

Replace each character in `"banana"`:

```
b   a   n   a   n   a
00  1   01  1   01  1
```

Encoded:

```
001011011
```

---

### Decode

- Start at the root of the Huffman tree
- Read the encoded bits from left to right
- If the bit is 0, move to the left child, or if the bit is 1, move to the right child
- When a leaf node is reached, add its character to the result
- Return to the root and continue with the remaining bits
- Repeat until all bits are processed
- The final result is the original text
