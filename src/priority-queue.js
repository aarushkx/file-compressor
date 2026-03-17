export class Node {
    constructor(data, freq) {
        this.data = data;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

// Priority Queue using Min-Heap
export class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    #getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }

    #getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }

    #getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    #hasLeftChild(index) {
        return this.#getLeftChildIndex(index) < this.heap.length;
    }

    #hasRightChild(index) {
        return this.#getRightChildIndex(index) < this.heap.length;
    }

    #hasParent(index) {
        return this.#getParentIndex(index) >= 0;
    }

    #leftChild(index) {
        return this.heap[this.#getLeftChildIndex(index)];
    }

    #rightChild(index) {
        return this.heap[this.#getRightChildIndex(index)];
    }

    #parent(index) {
        return this.heap[this.#getParentIndex(index)];
    }

    #swap(indexOne, indexTwo) {
        const temp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }

    #heapifyUp() {
        let i = this.heap.length - 1;
        while (this.#hasParent(i) && this.#parent(i).freq > this.heap[i].freq) {
            this.#swap(this.#getParentIndex(i), i);
            i = this.#getParentIndex(i);
        }
    }

    #heapifyDown() {
        let i = 0;
        while (this.#hasLeftChild(i)) {
            let smallerChildIndex = this.#getLeftChildIndex(i);
            if (
                this.#hasRightChild(i) &&
                this.#rightChild(i).freq < this.#leftChild(i).freq
            ) {
                smallerChildIndex = this.#getRightChildIndex(i);
            }
            if (this.heap[i].freq < this.heap[smallerChildIndex].freq) {
                break;
            } else {
                this.#swap(i, smallerChildIndex);
            }
            i = smallerChildIndex;
        }
    }

    size() {
        return this.heap.length;
    }

    // Returns the top element
    peek() {
        if (this.heap.length === 0) return null;
        return this.heap[0];
    }

    // Removes the top element with the highest priority then calls heapifyDown
    delete() {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.#heapifyDown();
        return top;
    }

    // Adds an element to the end of the heap then calls heapifyUp
    insert(item) {
        this.heap.push(item);
        this.#heapifyUp();
    }
}
