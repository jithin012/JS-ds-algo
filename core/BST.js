/**
 * 
 * HTML DOM
 * Network Routing
 * Abstract Syntax Tree
 * AI
 * 
 * Binary Search Tree - It have to be sorted in advance 
 *  at-most 2 child
 *  on Left < parent
 *  on Right > parent
 * 
 * Big O notation
 *  log n base 2 - when 2^n nodes increase, only log based times needs to take
 *      eg: when n = 4, height will be 2(2^2)
 *               n = 8, height will be 3(2^3)
 *  insertion - O(log n)
 *  Searching - O(log n)
 * 
 * InOrder In BST gives ascending order(low -> high)
 * PreOrder in BST uses "Export" so easily re-constructed or copied
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    /**
     * Insert = add a node to the tree
     * 
     * create a new node
     * starting at the root
     *      Check if there is a root,
     *          if not - the root now becomes that new node
     *          otherwise, check if the value of the new node is grater than or less than the value of the root
     *              if it is grater 
     *                  Check to see if there is a node right
     *                      if there is, move to that node and repeat these steps
     *                      if there is not, add that node as the right property
     *              if it is less
     *                  check to see if there is a node to the left
     *                      if there is, move to that node and repeat these steps
     *                      if there is not, add that node as the left property
     * 
     */
    insert(val) {
        const newNode = new Node(val);
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while(true) {
            if(val === current.value) {
                return false; // handle duplicate value
            }
            if (val < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left; // continue iteration
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right; // continue iteration
            }
        }
    }

    /**
     * Finding a Node 
     * start from root
     *  check if ther is a root, if not return false
     * if there is root, check if the value of the new node is the value we are looking for, return true
     * if not, check value is > or < to the root
     * if it is greater
     *     check to see if there is a node to the right
     *          if there is, move to the node and repeat these steps
     *          if there is not, we're done searching
     * if it is less
     *      check to see if there is a node to the left
     *          if there is, move to that node and repeat these steps
     *          if there is not, we're done searching
     */
    find(val) {
        if(!this.root) {
            return undefnied;
        }
        let current = this.root;
        if (current.value === val) {
            return current;
        }

        let found = false;
        while(current && !found) {
            if ( val < current.value ) {
                current = current.left
            } else if ( val > current.value) {
                current = current.right;
            } else {
                found = true;
            }
        }
        return found === true ? current : undefined        
    }

    /**
     * Breadth-First-Search
     * Create a queue and a variable to store the values of nodes visited
     * Place the root node in the queue
     * Loop as long as there is anything in the queue
     *      Dequeue a node from the queue and push the value od the node into the variable that stores the nodes
     *      if there is a left property on the node dequeued - add it to the queue
     *      if there is a right property on the node dequeued, add it to the queue
     * return the variable that stores the values
     * 
     */
    BFS() {
        const data = [];
        const queue = [];
        queue.push(this.root);

        let node;
        while (queue.length) {
            node = queue.shift();
            data.push(node.value); // /push(node.value)
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        return data;
    }

    /**
     * 
     * Depth-First-Search (Pre-Order)
     * 
     * Create  a variable to store the vales of nodes visited
     * store the root of the BST in a variable called current
     * Write a helper function which accepts a node
     *      push the vales of the node to the variable that stores the values
     *      if the node has a left property, call the helper function with the left property on the node
     *      if the node has a right property, call the helper function with the right property on the node
     * invoke the helper function with the current variable
     * return the array of values
     *
     */
    DFSPreOrder() {
        const data = [];
        
        function traverse(node) {
            data.push(node.value);
            if(node.left) {
                traverse(node.left)
            }
            if (node.right) {
                traverse(node.right);
            }
        }
        traverse(this.root);

        return data;
    }

    DFSPostOrder() {
        const data = [];
        
        function traverse(node) {
            if (node.left) {
                traverse(node.left);
            }
            if (node.right) {
                traverse(node.right);
            }
            data.push(node.value)
        }
        traverse(this.root);

        return data;
    }

    DFSInOrder() {
        const data = [];
        
        function traverse(node) {
            if (node.left) {
                traverse(node.left);
            }
            data.push(node.value);
            if (node.right) {
                traverse(node.right);
            }
        }
        traverse(this.root);

        return data;
    }
}

/**
 *                  10
 *              6       15
 *           3     8        20
 * 
 * 
 */
function testTree() {
    const tree = new BinarySearchTree();
    tree.root =  new Node(10);
    tree.insert(6);
    tree.insert(15);
    tree.insert(3);
    tree.insert(8);
    tree.insert(20);

    console.log('BSF -> ',tree.BFS());
    console.log('DFSPreorder -> ', tree.DFSPreOrder());
    console.log('DFSPostOrder -> ', tree.DFSPostOrder())
    console.log('DFSInOrder -> ', tree.DFSInOrder())
   
}

module.exports = {
    testTree,
    BinarySearchTree
}