class Graph {
    constructor(list) {
        this.graph = list || [];
    }
    
    addEdge(point1, point2) {
        this.graph.push([point1, point2]);
    }
    
    findEdge(point1, point2) {
        for(let i = 0; i < this.graph.length; i++) {
            if(this.graph[i][0] === point1) {
                if(this.graph[i][1] === point2) {
                    return i;
                }
            } 
            if(this.graph[i][0] === point2) {
                if(this.graph[i][1] === point1) {
                    return i;
                }
            } 
            return -1;
        }
    }
    
    removeEdge(index) {
        if(index !== -1) {
            var temp_graph = new Graph();
                temp_graph = (this.graph.slice(0, index)).concat(this.graph.slice(index + 1));  
            this.graph = temp_graph;
        }
    }
    
    // returns array of incident points
    getIncidentToVertex(vertex) {
        var result = [];
        for(let i = 0; i < this.graph.length; i++) {
            if(this.graph[i][0] === vertex) {
                result.push(this.graph[i][1]);
            }
            if(this.graph[i][1] === vertex) {
                result.push(this.graph[i][0]);
            }
        }
        return result;
    }
}

