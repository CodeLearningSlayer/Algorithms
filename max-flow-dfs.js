class Edge{
    to; 
    c; 
    rev;
    constructor (to, capacity, reverse){
        this.to = to;
        this.cap = capacity;
        this.rev = reverse
    }
}


const fordFulkerson = (size) => {
    let graph = [];
    for (let i=0; i<size; i++)
        graph.push([]);
    let counter = 0;
    let m = 10;
    let edges = 
    [
        [0, 1, 10],
        [0, 3, 2],
        [0, 4, 4],
        [1, 2, 5],
        [1, 3, 7],
        [2, 6, 8],
        [3, 2, 6],
        [3, 6, 2],
        [4, 5, 10],
        [5, 6, 13]
    ]

    let visited = Array(size).fill(false);

    const addEdge = (from, to, capacity) => {
        graph[from].push(new Edge(to, capacity, graph[to].length));
        graph[to].push(new Edge(from, 0, graph[from].length - 1));
    }

    while (counter < m){
        addEdge(edges[counter][0], edges[counter][1], edges[counter][2]);
        counter++;
    }
    
    const dfs = (u, t, flow) => {
        if (u == t){
            return flow;
        }
        visited[u] = true;
        for (let i=0; i < graph[u].length; i++){
            let e = graph[u][i];
            if (!visited[e.to] && e.cap > 0){
                let delta = dfs(e.to, t, Math.min(flow, e.cap));
                if (delta > 0){ //основное условие выхода из тупика
                    e.cap -= delta;
                    graph[e.to][e.rev].cap += delta; //добавляем пропускную способность для обратных рёбер, чтобы была возможность по ним пройтись "обратно"
                    return delta; 
                }
            }
        }
        return 0;
    }

    const maxFlow = (source, stock) => {
        let flow = 0;
        let count = 0;

        while(true){
            visited.fill(false);
            let f = dfs(source, stock, Infinity);
            count += 1;
            if (f == 0){
                return flow;
            }
            flow += f;
        }
    }
    console.log(maxFlow(0, 6));
}




fordFulkerson(7);
