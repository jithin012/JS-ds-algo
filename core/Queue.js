/**
 * FIFO - First In First Out
 * 
 * Eg: Background task
 * Uploading resources
 * Printing/task processing 
 * 
 * By using array 
 *      Either use push - shift
 *      or unshift - pop
 *      The real problem here is RE-INDEXING everytime on this operation when list has >1000 items
 * 
 * To get performance use custom queue.
 * 
 * insertion - O(1)
 * Removal - O(1)
 * Searching - O(N)
 * Access - O(N)
 */

 class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(val) {
        const node = new Node(val);
        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;            
        }
        this.size++;
    }

    dequeue() {
        if(!this.first) {
            return false;
        }
        const temp = this.first;
        if (this.size === 1) { // this.first === this.last
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}
function testQueue() {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    console.log(queue);
    queue.dequeue();
    console.log(queue);
}

module.exports = {
    testQueue
}