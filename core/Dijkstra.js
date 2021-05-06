/**
 * Find the shortest path between 2 vertices on a graph
 * 
 * 
 */
// const { PriorityQueue } = require('./PriorityQueue');

class WeighedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
        this.adjacencyList[vertex].push(vertex);
    }

    addEdge(v1, v2, weight) {
        this.adjacencyList[v1].push({node: v2, weight});
        this.adjacencyList[v2].push({node: v1, weight});
    }

    dijkstra(start, finish) {
        const node = new PriorityQueue();
        const distance = {};
        const previous = {};

        const path = []; // let it return result


        // build up initial state
        for( let vertex in this.adjacencyList) {
            if (vertex === start) {
                distance[vertex] = 0;
                node.enqueue(vertex, 0);
            } else  {
                distance[vertex] = Infinity;  // Infinity
                node.enqueue(vertex, Infinity);

            }
            previous[vertex] = null
        }

        // as long as there is something to visit
        let smallest;
        while(node.values.length) {
            smallest = node.dequeue().val;
            if (smallest === finish) {
                // we are done!
                // build up path to return at the end
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest]
                }
                break;
            }
            if (smallest || distance[smallest] !== Infinity) {
                for (let neighbour in this.adjacencyList[smallest]) {
                    // find neightbour node
                    let nextNode = this.adjacencyList[smallest][neighbour];

                    // calcualte distance to neighbour node
                    let candidate = distance[smallest] + nextNode.weight;
                    let nextNeighbour = nextNode.node;

                    if (candidate < distance[nextNeighbour]) {
                        // updating new smallest distance to neighbour
                        distance[nextNeighbour] = candidate;
                        // updating previous - How we got to neighbour 
                        previous[nextNeighbour] = smallest
                        // enqueue in priority queue with new priority
                        node.enqueue(nextNeighbour, candidate);
                    }
                }
            }
        }

        // return path;
        return [smallest, ...path.reverse()]
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    
    enqueue(val, priority) {
        this.values.push({val, priority});
        this.sort();
    }

    dequeue() {
        const removed = this.values.shift();
        // this.sort();
        return removed;
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}


        /**
         *           A
         *          / \
         *       2/    \4
         *       /      \ 
         *    C |        \
         *   4 |  \ 2     \   
         *     |   \       \
         *   F | \  \       B
         *     |  1\ \D   /   
         *     1\    /   /  3    
         *       \  / 3 /        
         *        E   /
         *  
         * 1. Every time we look to visit a new node, we pick the node with the smallest known distance to visit first
         * 2. Once we've moved to the node we're going to visit, we look at each of its neighbour
         * 3. For each neighbour node, we calculate the distance by summing the total edges that lead to the node we're checking from the starting node
         * 4. If the new total distance to a node is less than the previous total, we store the new shorter distance for the node
         *  
         * A TO E = A -> C(2) -> D(2) -> F(1) -> E(1)
         * 
         */
function testDijkstra() {
    const graph = new WeighedGraph();
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");
    graph.addVertex("E");
    graph.addVertex("F");

    graph.addEdge("A", "B", 4);
    graph.addEdge("A", "C", 2);
    graph.addEdge("B", "E", 3);
    graph.addEdge("C", "D", 2);
    graph.addEdge("C", "F", 4);
    graph.addEdge("D", "E", 3);
    graph.addEdge("D", "F", 1);
    graph.addEdge("E", "F", 1);
    
    console.log(graph.dijkstra("A", "E"));
    console.log(graph.dijkstra("A", "F"));


}

module.exports = {
    testDijkstra
}