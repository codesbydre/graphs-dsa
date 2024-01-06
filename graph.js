class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set(); // initialize a set to store all nodes in the graph
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex); //adds the given vertex to the set of nodes in the graph
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    //loops through array of vertices
    for (const vertex of vertexArray) {
      this.nodes.add(vertex); // adds each vertex to the set of nodes in the graph
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    //loops through adjacent vertices of the vertex
    for (const adjacentVertex of vertex.adjacent) {
      adjacentVertex.adjacent.delete(vertex); // removes vertex from set of adjacent nodes of each adjacent vertex
    }
    this.nodes.delete(vertex); //removes vertex from the set of nodes in the graph
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set(); // creates a set to keep track of visited nodes
    const result = []; //initializes an array to store the result of DFS

    const dfs = (vertex) => {
      //defines a recursive function for DFS.
      if (!vertex) return; // base case: if the vertex is null, return
      visited.add(vertex); // marks the current vertex as visited
      result.push(vertex.value); // adds the value of the vertex to the result array

      vertex.adjacent.forEach((neighbor) => {
        //loops through the adjacent vertices of the current vertex
        if (!visited.has(neighbor)) {
          // if the neighbor has not been visited,
          dfs(neighbor); // recursively call DFS on the neighbor
        }
      });
    };

    dfs(start); //starts DFS from the given start vertex

    return result; //returns the result array
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set([start]); // creates a set for visited nodes, initializing it with the start node
    const queue = [start]; // initializes a queue with the start node
    const result = []; // initializes an array to store the result of BFS

    while (queue.length) {
      // while there are nodes in the queue,
      const vertex = queue.shift(); // removes the first node from the queue
      result.push(vertex.value); //adds the value of the vertex to the result array

      vertex.adjacent.forEach((neighbor) => {
        // loops through the adjacent vertices of the current vertex
        if (!visited.has(neighbor)) {
          // if the neighbor has not been visited,
          visited.add(neighbor); // marks the neighbor as visited
          queue.push(neighbor); // adds the neighbor to the queue
        }
      });
    }

    return result; // returns the result array
  }
}

module.exports = { Graph, Node };
