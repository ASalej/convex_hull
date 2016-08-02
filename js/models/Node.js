class Node {
    constructor(point, neighboring_vertices) {
        this.point = point;
        this.neighbors = neighboring_vertices || [];
    }
    
    // type of vertex is node
    addNeighboringVertex(vertex) {
        this.neighbors.push(vertex);
        vertex.neighbors.push(this.point);
    }
    
    // type of vertex is node
    removeNeighboringVertex(vertex) {
        var index = this.neighbors.indexOf(vertex);
        this.neighbors.splice(vertex, 1);
        var index2 = vertex.neighbors.indexOf(this.point);
        vertex.neighbors.splice(index2, 1);
    }
}