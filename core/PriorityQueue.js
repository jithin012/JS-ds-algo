
class Node {
    constructor(val, priority) {
        this.value = val;
        this.priority= priority;
    }
}


/**
 * Write a """">>>>>MIN-BINARY Heap- Lower number means higher priority<<<<<<""""
 * 
 * Enqueue - accept a value and priority makes a new node, and puts it in the right spot based off of its priority
 * 
 * Dequeue - removes root element, returns it, and re-arranges heap using priority
 * 
 */

class PriorityQueue {

    constructor() {
        this.values = [];
    }

    enqueue(element, priority) {
        const node = new Node(element, priority);
        this.values.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.values.length -1;
        const element = this.values[index];

        while (index > 0) {
            let parentIndex = Math.floor( (index-1) /2 );
            let parent = this.values[parentIndex];

            if (element.priority >= parent.priority) {
                // this is a valid heap. parent has smaller value 
                break;
            }

            this.values[parentIndex] = element;
            this.values[index] = parent;
            index = parentIndex;
        }

    }

    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }

    sinkDown() {
        let index = 0;
        const totalLength = this.values.length;
        const element = this.values[0];

        while (true) {

            let leftChildIndex = 2*index +1;
            let rightChildIndex = 2*index +2;

            let leftChild;
            let rightChild;

            let swap = null;

            if (leftChildIndex < totalLength) {
                leftChild = this.values[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < totalLength) {
                rightChild = this.values[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < element.priority)
                    ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    // TODO? same priority with 2 node ?
                    // handle by time insert, add one  more property in node and do the time comparison also
                    swap = rightChildIndex;
                }
            }
            if (swap === null) {
                break;
            }

            // swap
            this.values[index] = this.values[swap];
            this.values[swap] = element;
            index = swap;
        }
    }
}

function testPriorityQueue() {

    const priQueue = new PriorityQueue();

    priQueue.enqueue('jeena', 2);
    priQueue.enqueue('jithin', 3);
    priQueue.enqueue('jitto', 1);

    console.log(priQueue);

    console.log(priQueue.dequeue());
    console.log(priQueue.dequeue());
    console.log(priQueue.dequeue());

}

module.exports = {
    testPriorityQueue,
    PriorityQueue
}