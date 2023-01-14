
class Graph {
    #size; //кол-во вершин
    #graph = [];

    constructor (size){
        this.#size = size;
        this.#graph = [];
        for (let i =0; i<size; i++) 
            this.#graph.push([]);
    }

    addEdge(src, dest){
        this.#graph[src].push(dest);
        this.#graph[dest].push(src);
    }

    print(){
        this.#graph.forEach(item => console.log(item));
    }

    dfs() {

        const stack = [];
        const path = [];
        let isVisited = Array(this.#size).fill(false);
        let value = 0;

        const chords = []; //стек для хорд (вершина откуда пришли; куда пришли)

        stack.push(0);

        while (stack.length > 0){
            value = stack.pop(); //value - вершина

            if (isVisited[value]) 
                continue;

            path.push(value);
            isVisited[value] = true;

            for (let i=0; i<this.#graph[value].length; i++){ //проходимся по соседям
                if (!isVisited[this.#graph[value][i]]) {
                    stack.push(this.#graph[value][i]);
                }
                else{
                    chords.push([value, this.#graph[value][i]]);
                }
            }
        }

       

        this.searchChords(path, chords);
    }

    searchChords(path, chordsStack){
        while (chordsStack.length > 0){
            let chord = chordsStack.pop();

            let indexVertex = path.indexOf(chord[0]),
                result = 0;

            let isRight = false,
                isLeft = false;
        

            if (indexVertex == path.length - 1){
                if (path[indexVertex - 1] !== chord[1]) {  //проверяем является ли она ребром с предыдущей вершиной
                    isRight = true;                        //если нет - то это ребро - хорда
                    isLeft = true;
                }
            }

            else if (indexVertex === 0){
                if (path[indexVertex + 1] != chord[1]){
                    isLeft = true;
                    isRight = true;
                }
            }

            else{
                if (path[indexVertex - 1] != chord[1] && path[indexVertex] == chord[0]){
                    result = chord[1];
                    isLeft = true;
                }
                if (path[indexVertex + 1] != chord[1] && path[indexVertex] == chord[0]){
                    result = chord[1];
                    isRight = true;
                }
            }

            if (isLeft && isRight){
                console.log("Хорда : " + chord);
                this.createContour(chord, path);
            }
        }
    }

    createContour(chord, path){
        let contour = [];

        let indexLeft = path.indexOf(chord[1]),
            indexRight = path.indexOf(chord[0]);

        while (indexLeft <= indexRight){
            contour.push(path[indexLeft]);
            indexLeft++;
        }

        console.log("Итоговый контур: ", ...contour);
    }
}

checkDFS = () =>{
    const graph = new Graph(5);
    graph.addEdge(0, 1);
    graph.addEdge(0, 2);
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(2, 4);
    graph.addEdge(3, 4);

    graph.print();

    graph.dfs();
}

checkDFS();
