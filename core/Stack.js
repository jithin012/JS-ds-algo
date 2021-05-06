/**
 * 
 * LIFO - Last In First Out 
 * 
 * Eg: Managing function Invocation - call stack
 * Undo/Redo
 * Routing in Browser
 * 
 * 
 * insertion - O(1)
 * Removal - O(1)
 * Searching - O(N)
 * Access - O(N)
 * 
 * Why Singly L L is not used here ?
 *      It's need O(N) to pop. 
 * 
 * Think about RE_INDEXing bys using simple array whem items > 1000
 */

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    push(val) {
        const node = new Node(val);
        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            const temp = this.first;
            this.first = node;
            this.first.next = temp;
        }
        this.size++;
    }

    pop() {
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
function testStack() {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    console.log(stack);
}

module.exports = {
    testStack,
    Stack
}