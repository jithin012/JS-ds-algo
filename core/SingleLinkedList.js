/**
 * 
 * contains a head, tail and length property
 * node is connected as single connector
 *  Big O notation
 *      Insertion - O(1)
 *      Removal  - O(N) or O(1)
 *      Searching - O(N)
 *      Access - O(N)
 * 
 * Single Linked List are excellent alternative to arrays when insertion and deletion at the beginning are frequently required
 * 
 * Arrays contain a built in index whereas linked list do not
 */

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SingleLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
    /**
     * 
     * this function should accept a value
     * create a node using the value passed to the function
     * if there is no head property on the list, set the head and tail to be the newly created node
     *      otherwise set the next property on the tail to be the new node and
     *      set the tail property on the list to be the newly created node
     * increment the length by one 
     */
    push(val) {
        const node = new Node(val);
        if (this.head === null) { // means empty list
            this.head = node;
            this.tail = node
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
        return this;
        
    }
    /**
     * If no node return undefnied
     * Loop through the list until you react the tail
     * Set the next property of the 2nd last node to be null
     * set the tail to be the 2nd last node
     * return removed node
     */
    pop() {
        if (this.head === null) {
            return undefined;
        }
        let current = this.head;
        let newTail = current;
        while(current.next) {
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if (this.length === 0) {
            this.head = this.tail = null
        }
        return current;
        
    }
    /**
     * Shift - remove element from head of list
     * 
     * if no node return undefined
     * store the current head property in a variable
     * set the head property to the current head's next property
     * reduce length by one
     * return the value of the node removed
     */
    shift() {
        if (this.head === null) {
            return undefined;
        }
        const newHead = this.head;
        this.head = newHead.next;
        this.length--;
        if (this.length === 0) {
            this.tail = null;
        }
        return newHead;
    }
    /**
     * unshift - add element at the begining of the list
     * accpet a value
     * create a node using the value passed to the function
     * if no head, set the head and tail to be newly created node
     * otherwise set the newly created node's nexr property to be the current head property on the list
     * set the head property on the list to be that newly created node
     * increment length by one
     * return linked list
     *
     */
    unshift(val) {
        const newNode = new Node(val);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this.list;
    }
    /**
     * 
     * set
     *  Changing the value of a node based on it's position in the linked list
     * 
     * accpet value and index to a function
     * use get function to find the specific node
     * if the node not found, retuns false
     * otherwise set the value of that node to be the value passed to the function and return true
     */
    set(index, value) {
        let node = this.get(index);
        if (!node) {
            return false;
        }
        node.val = value;
        return true;
    }
    /**
     * get - 
     * 
     */
    get(index) {
        if (index < 0 || index >= this.length) return null;
        let counter = 0;
        let current = this.head;
        while(counter !== index) {
            current = current.next;
            counter++
        }
        return current;
    }
    /**
     * insert  - adding a node to the linked list at a specific position
     * 
     * accpet index and value
     * 
     * if index is less than or greater than the length, return false
     * if the index is same as the length, push a new node to the end of the list
     * if the index is 0, unshift the new node to the start of the list
     * otherwise, using a get method, access the node at the index - 1
     * set the next property on that node to be the new node
     * set the new node's next property to be previous next
     * increment lengthby one
     * return true
     *
     */
    insert(index, value) {
        if (index < 0 || index >= this.length) {
            return false;
        }
        if (index === this.length-1) { // or index === this.length - 1 ??
            return this.push(value)
        }
        if (index === 0) {
            return this.unshift(val);
        }
        let previous = this.get(index-1);
        const newNode = new Node(value);
        newNode.next = previous.next;
        previous.next = newNode;
        this.length++;
        return true;

    }
    /**
     * remove - removing a node the linked list at a specific positon
     * if the index is < 0 or > length return undefined
     * if the index === length, pop it
     * if index === 0, shift it
     * otherwise use get method access the node at the index - 1
     * set the next property of previous node to be next of the next node
     *  decrement length by one
     * return the value of the node removed
     * 
     */
    remove(index) {
        if (index < 0 || index >= this.length) {
            return false;
        }
        if (index === this.length -1 ) {
            return this.pop();
        }
        if (index === 0) {
            return this.shift();
        }
        const previousNode = this.get(index -1);
        const currentNode = previousNode.next
        previousNode.next = currentNode.next;
        this.length--;
        return currentNode;
    }
    /**
     * reverse - COMMON INTERVIEW question
     * swap head and tail 
     * create variable next and prev
     * create a variable called node and initialize it to the head property
     * loop through list
     *      set next to be the next property on whatever node is
     *      set the next property on the node to be wahtever prev is
     *      set prev to be the value of the node variable
     *      set the node variable to be the value of the next variable
     */
    reverse() {
        // swap
        let node = this.head;
        this.head = this.tail;
        this.tail = node;
        // loop
        let next;
        let prev = null;

        for (let i =0; i<this.length; i++) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return this;
    }
    traverse() {
        let current = this.head;
        while (current) {
            console.log(current.val);
            current = current.next;
        }
    }

}

function test() {
    const list = new SingleLinkedList();
    list.push("test 1");
    list.push('test 2');
    list.push('test 3');
    console.log("after pushing");
    list.traverse();
    console.log('after poping')
    list.pop();
    list.traverse();
    console.log('shift ', list.shift());
    // console.log('shift ', list.shift());
    list.unshift('test 4');
    list.traverse()

    list.set(0, 'test 0')
    console.log('get ', list.get(0));
    console.log(list.insert(1, 'TEST 1'));
    list.traverse()
    list.remove(1);
    console.log('after removing index 1')
    list.traverse();
    console.log('add 2 more node')
    list.insert(1, 'TEST 2')
    list.insert(2, 'TEST 3')
    list.traverse();
    console.log('reversing...');
    console.log(list.reverse());

}

module.exports = {
    test,
    SingleLinkedList
}