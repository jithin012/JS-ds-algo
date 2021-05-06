/**
 * Google map is weighted and directed Graph
 * 
 * Data structure
 * Adjacency Matrix - 2-D array
 * Adjacenct List - only handle connected list
 * 
 *  |V| - No.of vertices
 *  |E| - NO.OF EDGES
 * 
 *      operation           Adjacency List          Adjacency Matrix
 * 
 *  Add vertex                  O(1)                        O(|V^2|)
 *  Add edge                    O(1)                        O(1)
 *  Remove Vertex               O(|V| + |E|)                O(|V^2|)
 *  Query                       O(|V| + |E|)                O(1)
 *  Storage                     O(|V| + |E|)                O(|V^2|)(More Memory)
 * 
 * 
 *      Adj-List 
 *          Less Space 
 *          Faster to iterate
 *          Slower to lookup specific edge
 * 
 *      Adj-Matrix
 *          More Space
 *          Slower to iterate
 *          Faster Lookup
 * 
 */

// const { Stack } = require('./Stack');

class Graph { // Undriected

    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    /**
     * 
     * Adding an edge should accept 2 vertices, call them vertex1 and vertex2
     * This function should find in the adjacency list, the key of vertex1 and push vertex2 to the array
     * The function should find in the adjcency list, the key of vertex2 and push vertex1 to the array
     * 
     */
    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }

    /**
     * 
     * This function should accept 2 vertices, we'll call vertex1 and vertex2
     * The function should reassign the key of vertex1 to be an array that does not contain vertex2
     * The function should reassign the key of vertex2 to be an array that does not contain vertex1
     */
    removeEdge(v1, v2) {
        this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
        this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
    }

    /**
     * 
     * The function should accept a vertex to remove
     * The function should loop as long as there are any other vertices in the adjacency list for that vertex
     * Inside of the loop, call our removeEdge function with the vertex we are removing and any values in the adjacency list for that vertex
     * Delete the key in the adjacency list for that vertex.
     */
    removeVertex(vertex) {
        while(this.adjacencyList[vertex].length) {
            const adjVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjVertex);
        }
        delete this.adjacencyList[vertex];
    }

    /**
     * 
     * traversal uses
     *  1. peer to peer networking
     *  2. web crawlers
     *  3. finding "closest" matches/recommendations
     *  4. shortest path
     *  5. GPS
     *  6. solving mazes
     *  7. AL
     * 
     * DFS - prirotize visiting children rather than sibling
     * Data Structure for DFS uses STACK
     * 
     * pseduo code 
     * 
     * if vertex is empty 
     *      return (this is the base case)
     *  add vertex to the results list
     *  mark vertex as visited
     *  for each neighbour  in vertex's neighbours:
     *      if neighbour is not visited
     *          recursively call DFS on neighbour
     * 
     * 
     * The function should accept a starting node
     * create a list to store the end result, to be returned at the very end
     * create an object to store visited vertices
     * create a helper function which accept a vertex
     *      the helper function should return early if the vertex is empty
     *      the helper function should place the vertex it accepts into the visited object and push that vertex into the result array
     *      loop over all of the values in the adjancency list for that vertex
     *      if any of those values have not been visited, recursively invoke the helper function with that vertex
     * invoke the helper function with starting node
     * 
     */

    DFSRecursive(startingVertex) {
        const result = [];
        const visited = {};
        const adjList = this.adjacencyList;

        (function dfs(vertex) {
            if(!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjList[vertex].forEach(neighbour => {
                if(!visited[neighbour]) {
                    return dfs(neighbour);
                }
            });
        })(startingVertex);

        return result;
    }

    /**
     * DFS iterative(start)
     *  let S be a stack
     *  S.push(start)
     *  
     *  while S is not empty
     *      vertex = S.pop()
     *       if vertex is not labeled as discovered:
     *          visit vertex - add to the result list
     *          label vertex as discovered
     *          for each neighbour of vertex, 
     *              if neighbour not visited:
     *                  S.push(neighbour)
     *      
     * 
     */
    DFSIterative(start) {
        const result = [];
        const visited = {};
        
        const stack = []; //new Stack();
        stack.push(start);

        let currentVertex;
        while(stack.length) {
            currentVertex = stack.pop();        // diff with queue, take from last
            if (!visited[currentVertex]) {

                result.push(currentVertex);
                visited[currentVertex] = true;
                
                const neighbours = this.adjacencyList[currentVertex];
                neighbours.forEach(neighbour => {
                    if (!visited[neighbour]) {
                        stack.push(neighbour);
                    }
                });
            }
        }

        return result;
    }

    /**
     * 
     * BFS - prirotize visiting sibling rather than children
     * Data Structure for BFS uses QUEUE
     * 
     * This function should accept a starting vertex
     * Create  a queue and place the starting vertex in it.
     * Create an array to store the nodes visited
     * Create an object to store nodes visited
     * 
     * mark the starting vertex as visited
     * loop as long as there is anything in the queue
     *  remove the first vertex from the queue and push it into the array that stores node visited
     *  loop over each vertex in the adj list for the vertex you are visiting
     *  if it is not inside tha object that stores node visited, mark it as visited and enqueue that vertex
     * 
     * once you have finised looping, return the array of visited nodes
     * 
     */

    BFS(start) {
        const queue = [start];
        const result = [];
        const visited = {};

        let vertex;
        while(queue.length) {
            vertex = queue.shift();        // diff with stack, take from front side
            if (!visited[vertex]) {
                visited[vertex] = true;
                result.push(vertex);

                const neighbours = this.adjacencyList[vertex];
                neighbours.forEach(neighbour => {
                    if(!visited[neighbour]) {
                        queue.push(neighbour);
                    }
                });
            }
        }

        return result;
    }
}

function testGraph() {
    const kerala = new Graph();
    kerala.addVertex('A');
    kerala.addVertex('B');
    kerala.addVertex('C');
    kerala.addVertex('D');
    kerala.addVertex('E');
    kerala.addVertex('F');

    kerala.addEdge('A', 'B');
    kerala.addEdge('A', 'C');
    kerala.addEdge('B', 'D');
    kerala.addEdge('C', 'E');
    kerala.addEdge('D', 'E');
    kerala.addEdge('D', 'F');
    kerala.addEdge('E', 'F');
    console.log(kerala)

    console.log('\n DFS Recursive', kerala.DFSRecursive('A'));
    console.log('\n DFS Iterative', kerala.DFSIterative('A'));
    console.log('\n BFS Iterative', kerala.BFS('A'));


/**
 *          A
 *       /    \
 *      B      C
 *      |      |
 *      D ---  E
 *       \   /
 *         F
 * 
 * DFS : A, B, D, E, C, F
 *       A, C, E, F, D, B
 * 
 * BFS:  A, B, C, D, E, F
 * 
 */
}

module.exports = {
    testGraph
}