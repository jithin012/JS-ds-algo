/**
 * 
 * DLL Big O notation 
 * ------------------
 * Insertion - O(1)
 * Removal - O(1)
 * Searching - O(N) technically O(N/2)
 * Access - O(N)
 * 
 * Better than Singly Linked List for finding nodes and can be done in half time
 * 
 * Take more memory since considering extra pointer 
 * 
 * 
 */

class Node {
    constructor(val) {
        this.val = val;
        this.next =  null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.prev = null;
        this.length = 0;
    }
    /** 
     * adding node at the tail of list
     * 
     * Create a new node with value
     *  if the head property is null set the head and tail to be the newly create node
     *  if not, set the next property on the tail to be that node
     *  set the previous proptery on the newly created node to be tail
     *  set tail to be newly created node
     * */
    push(val) {
        const newNode = new Node(val);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return newNode;
    }
    /**
     * if no head, return undefined
     * store the current tail in a variable
     * if the length id 1, set the head and tail to be null
     * update the tail to be the previous node 
     * set tail.next to be null
     */
    pop() {
        if(this.head === null) {
            return undefined;
        }
        const tailNode = this.tail;
        if(this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = tailNode.prev;
            this.tail.next = null;
            tailNode.prev = null;
        }
        this.length--;
        return tailNode;
        
    }

    /**
     * Shift - remove from  head 
     * 
     * if empty list, return undefined
     * 
     * store the current head to a valiable
     * if length is one
     *      set head and tail to be null
     * otherwise
     *  set the head to be old head's next
     *  set prev of the new head to be null
     *  set the old head's next to be null
     * 
     * decrement the length
     * return old head
     */
    shift() {
        if (this.head === null) {
            return undefined;
        }
        const oldNode = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = oldNode.next;//this.head.next;
            this.head.prev = null;
            oldNode.next = null;
        }
        this.length--;
        return oldNode;
    }
    /**
     * Adding a node to the begining of DLL
     * 
     * create a new node with value
     * 
     * if length is 0
     *      set the tail and head to be new node
     * otherwise 
     *      set the prev property on the head to be the newNode
     *      set the next property on the new node to be the haed property
     *      update the head to be new node
     * increment length by one
     * return list
     */
    unshift(val) {
        const newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this.list;
    }
    /**
     * 
     * Accessing a node in a DLL by its position
     * 
     * if invalid index return null
     * 
     * if the index is less than or equal to the HALF the length of the list
     *      Loop through the list starting from the  head towards middle
     *      return the node once it is found
     * if the index id greated than HALF the length of the list
     *      loop through the list starting from the tail and towards middle
     *      return the node once it is found
     * 
     */
    get(index) {
        if (index < 0 || index >= this.length) {
            return undefined;
        }
       
        if(index <= this.length/2) {
            let counter = 0;
            let current = this.head;
            
            while(counter !== index) {
                current = current.next;
                counter++;
            }
            return current;
        } else {
            let counter = this.length - 1;
            let current = this.tail;

            while (counter !== index) {
                current = current.prev;
                counter--;
            }
            return current;
        }
    }
    /**
     * Replace the value of a node to the DLL
     * 
     * Create a variable which is the result of the 
     *  get methid at the index passed to the function
     * 
     *  if get() return valid node, set the value of that node to be the value passed to the function
     *  return true
     * 
     * otherwise 
     *  return false
     */
    set(index, value) {
        const foundNode = this.get(index);
        if (foundNode) {
            foundNode.val = value;
            return true;
        }
        return false;
    }
    /**
     * if the index  < 0 or >= length return undefiend
     * 
     * if the index is 0, unshift
     * 
     * if index = length -1 , push
     * 
     * otherwise
     *      use get method to acces the index - 1
     *      set the next and prev properties on the correct nodes to link everything together
     * 
     * increment length by one
     * 
     * return ture
     */
    insert(index, val) {
        if (index < 0 || index >= this.length) {
            return undefined;
        }
        if (index === 0) {
            this.unshift(val);
            return true;
        }
        if (index === this.length) {
            this.push(val);
            return true;
        }
        const prevNode = this.get(index-1);
        const afterNode = prevNode.next;

        const newNode = new Node(val);
        prevNode.next = newNode;
        newNode.prev = prevNode;
        
        newNode.next = afterNode;//prevNode.next;
        /**prevNode.next.prev */afterNode.prev = newNode;
        this.length++;
        return true;
    }

    /**
     * 
     * remove - Removing a node from DLL
     * 
     * if the index < 0 or > length return false
     * 
     * if index is 0, then shift 
     * 
     * if index is length, then pop
     * 
     * otherwise
     *  use get method to retrieve the item to be removed
     *  update the next and prev properties to remove the found node from the list
     *  set the next and prev to null on the found node
     *  decrement by 1
     * return deleted node
     */
    remove(index) {
        if (index < 0 || index >= this.length) {
            return false;
        }
        if (index === 0) {
            const deletedNode = this.shift();
            return deletedNode;
        }
        if (index === this.length -1) {
            const delectedNode = this.pop();
            return delectedNode;
        }
        // this.head = this.tail = null; ?
        const removedNode = this.get(index);
        const beforeNode = removedNode.prev;
        const afterNode = removedNode.next;

        beforeNode.next = afterNode; // removedNode.prev.next = removedNode.next;
        afterNode.prev = beforeNode; // removedNode.next.prev = removedNode.prev;
        
        removedNode.next = null;
        removedNode.prev = null;
        this.length--;
        return removedNode;
    }
}

function testDLL() {
    const list = new DoublyLinkedList();
    list.push(1);
    list.push(2);
    // console.log(list);
    // list.pop();
    // console.log(list);
    // list.shift();
    // list.unshift(3);
    // console.log(list);
    // list.push(3);
    // console.log(list);
    // console.log(list.get(1));
    // console.log(list.set(1, 4))
    list.insert(1, 1.5);
    console.log(list);
    console.log(list.remove(1));

}

module.exports = {
    testDLL
}