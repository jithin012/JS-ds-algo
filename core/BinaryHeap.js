/**
 *          [41, 39, 33, 18, 27, 12, 55]
 * 
 *              When index start from 1                          when index start from 0
 * 
 * parent(i)     return node[i/2];                                  return node[(i-1)/2]
 *                      
 * left(i)       return node(2*i)                                   return node[(2*i)+1]  
 * 
 * right(i)      return node[(2*i) + 1]                              return node[(2*i)+2]          
 * 
 * 
 *  
 * Big O
 * Insertion O(log N) : for 16 element heap, only 4 comparisons( 2^4 = 16 ie; height of heap)
 * Removal O(log N)
 * search O(N)
 * 
 * Binary Heaps are very useful data structure for sorting, and implementing other data structure like priority queue
 * Binary heas are either max-heap or min-heap with parents either being smaller ot larger than their children
 * 
 * 
 */

class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }

    insert(element) {
        this.values.push(element);
        this.bubbleUp();
    }

    /**
     * Bubble up
     *  Create a variable called index which is the length of the values property -1
     *  Create a variable called parentIndex which is the floor of [index-1]/2
     *  keep looping as long as the values element at the patentIndex is less that the values element at the child index
     *      swap the value of the values element at the parentIndex woth the value of the element property at the child index
     *      set the index to be the parentIndex, and start over!
     */
    bubbleUp() {
        let idx = this.values.length -1;
        const element = this.values[idx];
        while(idx > 0) {
            let parentIndex = Math.floor((idx - 1)/2);
            let parent = this.values[parentIndex];
            if (element <= parent) {
                break;
                // this is valid heap here. it satisfy max binary heap (parent will be greater )
            }
            // otherwise
            this.values[parentIndex] = element;
            this.values[idx] = parent;
            idx = parentIndex; 
        }

    }

    /**
     * Sink-down
     *  The procedure for deleting the root 
     *  from the head (either extract max-lement in max-heap or min-element from min-heap)
     *  and restoring the properties is called down-heap.
     * 
     * also called bubble-down, percolate-down, sift-down, trickle-down, heapify-down, cascade-down and extract-min/max
     * 
     * ExtractMax and bubble-down
     *  Swap the first value in the values property with the last one.
     *  pop from the values property, so you can return the value at the end
     *      (
     *          Now not satisfy heap, 
     *          for Max-heap, smaller comes on root
     *          for min-heap, greater comes on root
     *          Do sink-down
     *      )
     * 
     *  def Sink-down
     *      You parent Index start at 0,(the root)
     *      Find the index of the left child: 2*index + 1
     *      find the index of the right child: 2*index+ 2
     *      if the left or right child is greater than the element 
     *          swap with largest child
     *          the child index you swapped to now becomes the new parent Index
     *      keep looping and swaping until neither child os larger than the element(for max heap)
     *      return the old root
     * 
     * 
     */
    sinkDown() {
        let index = 0;
        const totalLength = this.values.length;
        const element = this.values[0];

        while (true) {
            let leftChildIndex = 2*index +1;
            let rightChildIndex = 2*index +2;

            let leftChild; // = this.values[leftChildIndex];
            let rightChild; // = this.values[rightChildIndex];

            let swap = null;
            if(leftChildIndex < totalLength) {
                leftChild = this.values[leftChildIndex];
                if(leftChild > element) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < totalLength) {
                rightChild = this.values[rightChildIndex];
                if (
                    (swap === null && rightChild > element) 
                    ||
                    (swap !== null && rightChild > leftChild)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.values[index] = this.values[swap];
            this.values[swap] = element;
            index = swap;
        }
        // element : element needs to be swap to either of child, then it compare with child -> swap if necessary, etc
    }

    extractMax() {
        const max = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
       
        return max;
    }

    /**
     * Priority Queue
     *  A data structure each element has a priority. Element with higher priorities are served before elements with lower priorities.
     * 
     * 
     */

}

function testMaxBinaryHeap() {
    const maxHeap = new MaxBinaryHeap();
    //[41, 39, 33, 18, 27, 12]
    maxHeap.insert(41);
    maxHeap.insert(39);
    maxHeap.insert(33);
    maxHeap.insert(18);
    maxHeap.insert(27);
    maxHeap.insert(12);
    maxHeap.insert(55);
    console.log(maxHeap);
    maxHeap.extractMax();
    console.log(maxHeap);
    maxHeap.extractMax();
    maxHeap.extractMax();
    maxHeap.extractMax();

    console.log(maxHeap);


}

module.exports= {
    testMaxBinaryHeap
}