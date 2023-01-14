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

function prim(matrix) {
    let minEdge;
    let totalDist = 0; // вес остова
    let path = []; // массив ребер, которые составляют остов
    let visited = []; // массив посещенных вершин
    let edges = []; // массив ребер графа
    let n = matrix.length; // количество вершин
    let currentVertex = 0; // текущая вершина
    let edgeIndex; // индекс минимального ребра в массиве
 
    while (path.length != n-1) {
 
        minEdge = new GraphEdge(-1, -1, 99999); // обнуляем минимальное ребро
        visited.push(currentVertex); // добавляем текущую вершину в массив посещенных вершин
 
        // Поиск всех ребер для текущей вершины
        for (let i = 0; i < n; i++) {
            if (matrix[currentVertex][i] != 0) {
                edges.push(new GraphEdge(currentVertex, i, matrix[currentVertex][i]));
            }
        }
 
        // Поиск минимального ребра из массива ребер
        for (let j = 0; j < edges.length; j++) {
            if (edges[j].w < minEdge.w && !visited.includes(edges[j].v)) {
                minEdge = edges[j];
                edgeIndex = j;
            }        
        }
 
        path.push(minEdge); // добавляем минимальное ребро в маршрут
        edges.splice(edgeIndex, 1); // удаляем это ребро из массива
        totalDist += minEdge.w; // суммируем расстояние
        currentVertex = minEdge.v; // переопределяем вершину
 
    }
 
    // вывод ребер остова и его веса
    console.log("\nОстов");
    for (let i = 0; i < path.length; i++) {
        console.log(`${path[i].u}->${path[i].v}\t${path[i].w}`);        
    }
    console.log(`Вес: ${totalDist}`);
 
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

const sortEdges = (edgeArr, size) => {
    edgeArr.sort((a,b) => a.w - b.w);
}

const main = () => {
    const graph = createGraph(5);
    const matrix = graph.getGraph();
    prim(matrix);
}

main();
