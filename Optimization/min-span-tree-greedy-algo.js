class Graph {
    #size; //кол-во вершин
    #graph = [];

    constructor (size){
        this.#size = size;
        this.#graph = [];
        for (let i =0; i<size; i++) 
            this.#graph.push(Array(size).fill(0));
    }

    addEdge(src, dest, weight){
        this.#graph[src][dest] = weight; 
        this.#graph[dest][src] = weight;
    }

    print(){
        this.#graph.forEach(item => console.log(item));
    }

    getGraph() {
        return this.#graph;
    }
}

class GraphEdge {
    u = -1;
    v = -1;
    w = -1;
}

const minSpanTree = (edgeArr, edgeNum, vertexNum, skeleton, numOfEdgesInSkeleton) => {

    let node = Array(vertexNum); //список вершин графа, используется для маркировки пройденных вершин 
    
    sortEdges(edgeArr, edgeNum);
    for (let i=0; i < vertexNum; i++){
        node[i] = 0;
    }
    numOfEdgesInSkeleton = 0;
    skeleton[numOfEdgesInSkeleton] = edgeArr[0];

    node[edgeArr[0].u] = 1;
    node[edgeArr[0].v] = 1;

    numOfEdgesInSkeleton++;

    while(numOfEdgesInSkeleton < vertexNum - 1){
        for (let i=0; i < edgeNum; i++){
            if (node[edgeArr[i].u] != node[edgeArr[i].v]){ //маркируем вершины ребра, если одно из них уже находится в остове (но не оба, т.к. образуют цикл)
                skeleton[numOfEdgesInSkeleton] = edgeArr[i];
                node[edgeArr[i].u] = 1;
                node[edgeArr[i].v] = 1;
                numOfEdgesInSkeleton++;
                break; //если такое ребро нашлось - пересчитываем по новой (ищем новое самое оптимальное ребро)
            }

        }
    }

    return skeleton;
}

const createGraph = (size) => {
    const graph = new Graph(size);
    graph.addEdge(0, 1, 20);
    graph.addEdge(0, 4, 90);
    graph.addEdge(1, 2, 25);
    graph.addEdge(1, 3, 45);
    graph.addEdge(1, 4, 7);
    graph.addEdge(2, 0, 10);
    graph.addEdge(2, 3, 15);
    graph.addEdge(2, 4, 47);
    graph.addEdge(3, 4, 62);
    graph.addEdge(3, 0, 34);

    
    return graph;
}




const getArrOfEdgesFromGraph = (graph, size) => {
    const edgeArr = [];
    for (let i = 0; i < size; i++){
        for (j = 0; j < size; j++){
            if (graph[i][j] !== 0){
                let newEdge = new GraphEdge();
                newEdge.u = i;
                newEdge.v = j;
                newEdge.w = graph[i][j];
                edgeArr.push(newEdge);
                graph[j][i] = 0;
            }
        }
    }
    return edgeArr;
}


const sortEdges = (edgeArr, size) => {
    edgeArr.sort((a,b) => a.w - b.w);
}

const main = () => {
    const graph = createGraph(5);
    const matrix = graph.getGraph();
    const edgeArr = getArrOfEdgesFromGraph(matrix, 5);
    console.log(minSpanTree(edgeArr, edgeArr.length, 5, [], 0));
}

main();
