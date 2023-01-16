class Graph {
    #size; //кол-во вершин
    #graph = [];

    constructor (size){
        this.#size = size;
        this.#graph = [];
        for (let i =0; i<size; i++) 
            this.#graph.push(Array(size).fill(0));
    }

    addEdge(src, v, weight){
        this.#graph[src][v] = weight; 
        this.#graph[v][src] = weight;
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
    constructor (source, v, weight){
        this.u = source;
        this.v = v;
        this.w = weight;
    }
}

const Kruskal = (size, edgeArr) => {
    let currentForest = []; //множество рёбер текущего состояния леса
    let currentForestNums = [];
    let components = []; // множество компонентов (подграфов)
    const minEdgeWeights = []; //веса минимальных рёбер для компонентов (пересчитывать)
    let minEdgeNums = []; //номера минимальных рёбер для компонентов  (пересчитывать?)
    const used = [];
    for (let i=0; i<size; i++){
        components[i] = i; //каждая вершина - в изолированном компоненте
        minEdgeWeights[i] = Infinity;
    }
    let numOfComponents = size;
    while (numOfComponents !== 1){
        currentForest = [];
        for (let k=0; k < edgeArr.length; k++){
            let i = components[edgeArr[k].u];
            let j = components[edgeArr[k].v];
            if (i !== j){
                if (edgeArr[k].w < minEdgeWeights[i]){
                    minEdgeWeights[i] = edgeArr[k].w;
                    minEdgeNums[i] = k;
                }
                if (edgeArr[k].w < minEdgeWeights[j]){
                    minEdgeWeights[j] = edgeArr[k].w;
                    minEdgeNums[j] = k;
                }
            }
        }
        const minEdgesCurrentForest = [];
        // for (let i = 1; i < numOfComponents; i++)
        //     minEdgesCurrentForest.push(minEdgeNums[i]);
        const setOfEdgesInForest = new Set(minEdgeNums);
        for (let edgeNum of setOfEdgesInForest){
            minEdgesCurrentForest.push(edgeArr[edgeNum]);
        }
        currentForestNums = currentForestNums.concat(...setOfEdgesInForest); //множественное соединение
           //создать матрицу смежности по рёбрам
        for (let edgeNum of currentForestNums){
            currentForest.push(edgeArr[edgeNum]);
        }
        [numOfComponents, components] = recalculation(currentForest, size); // пересчитать количество компонентов текущего леса и номера?
        for (let i=0; i<size; i++){
            minEdgeWeights[i] = Infinity;
        }
        minEdgeNums = [];
    } 
    return currentForest;
}

const recalculation = (edgeArr, size) => {
    const matrix = getMatrixFromEdgeArray(edgeArr, size);
    const [cNum, comp] = getNumOfComponents(matrix, size);
    return [cNum, comp];
}

const getMatrixFromEdgeArray = (edgeArr, size) => {
    const matrix = [];
    for (let i =0; i<size; i++) 
        matrix.push(Array(size).fill(0));
    for (let edge of edgeArr){
        matrix[edge.u][edge.v] = edge.w;
        matrix[edge.v][edge.u] = edge.w;
    }
    return matrix;
}

const getNumOfComponents = (matrix, size) => {
    let cNum = 0;
    const used = Array(size).fill(false);
    const comp = Array(size).fill(0);
    for (let i=0; i < size; i++){
        if (!used[i]){
            dfs(i, cNum, used, comp, matrix);
            cNum++;
        }
    }
    return [cNum, comp];
}

const dfs = (v, cNum, used, comp, graph) => {
    used[v] = true;
    comp[v] = cNum;

    for (let neighbor in graph[v]){
        if (!used[neighbor] && graph[v][neighbor] !== 0){
            dfs(neighbor, cNum, used, comp, graph);
        }
    }
}

const createGraph = (size) => {
    const graph = new Graph(size);
    graph.addEdge(0, 1, 1);
    graph.addEdge(0, 2, 2);
    graph.addEdge(0, 3, 6);
    graph.addEdge(1, 3, 4);
    graph.addEdge(1, 4, 8);
    graph.addEdge(2, 5, 7);
    graph.addEdge(2, 3, 9);
    graph.addEdge(3, 6, 3);
    graph.addEdge(3, 7, 6);
    graph.addEdge(4, 7, 4);
    graph.addEdge(5, 6, 7);
    graph.addEdge(5, 8, 2);
    graph.addEdge(6, 8, 8);
    graph.addEdge(6, 9, 9);
    graph.addEdge(7, 9, 5);
    graph.addEdge(8, 9, 3);
    
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

const main = () => {
    const graph = createGraph(10);
    const matrix = graph.getGraph();
    const edgeArr = getArrOfEdgesFromGraph(matrix, 10);
    console.log(Kruskal(10, edgeArr));
}

main();
