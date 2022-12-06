

let matrix = [
    [-1, 1, -1, 1, 1, -1, 1],
    [1, -1, 1, -1, 1, 1, -1],
    [-1, 1, -1, 1, -1, 1, 1],
    [1, -1, 1, -1, 1, -1, 1],
    [1, 1, -1, 1, -1, 1, -1],
    [-1, 1, 1, -1, 1, -1, 1],
    [1, -1, 1, 1, -1, 1, -1]
]

// let matrix = [
//     [-1, 1, -1, -1, -1, 1],
//     [1, -1, 1, -1, -1, -1], 
//     [-1, 1, -1, 1, -1, -1], 
//     [-1, -1, 1, -1, 1, -1], 
//     [-1, -1, -1, 1, -1, 1], 
//     [1, -1, -1, -1, 1, -1], 
// ]

let degs = matrix.reduce((acc, el, index) => {
    let degOne = el.reduce((acc, el) => {
        acc = (el != -1) ? acc + el : acc;
        return acc;
    }, 0);
    acc[index] = degOne
    return acc; 
}, [])


const dfs = (v, isVisited) => {
    isVisited[v] = true;
    for (let j in matrix){
        if (matrix[v][j] == 1 && isVisited[j] == false){
            dfs(j, isVisited);
        }
    }
}

const dfsForPath = (matrix, counter, arrToCheck) => { // v - след вершина, arrToCheck[counter] - текущая
        if (matrix[arrToCheck[counter - 1]][arrToCheck[counter]] == 1) {
            matrix[arrToCheck[counter - 1]][arrToCheck[counter]] = -1;
            matrix[arrToCheck[counter]][arrToCheck[counter - 1]] = -1;
            return dfsForPath(matrix, counter + 1, arrToCheck);
        }
    return counter - 1;
}

const checkEulerPath = () => {
    let oddVertex = 0;
    for (let i in matrix) {
        if (degs[i] % 2 == 1) oddVertex++;          
    }
    if (oddVertex > 2) {
        return false; //в таком случае граф не является эйлеровым
    }
    let visited = Array(matrix.length).fill(false, 0, matrix.length);
    for (v in matrix){
        if (degs[v] > 0){
            dfs(v, visited);
            break;
        }
    }
    for (v in matrix){
        if (!visited[v] && degs[v] > 0)
        {
            return false;
        }
    }
    return true;
}

checkEulerPath();

function generatePossiblePaths(matrix, index) {
    let posPaths = matrix[index].reduce((acc, el, index) => { //считаем возможные пути из текущей точки
        if (el !== -1){
            acc.push(index);
        }
        return acc;
    }, []);
    let randPath = posPaths[Math.floor(Math.random() * posPaths.length)];
    return randPath;
}

const maxEdges = Math.floor(degs.reduce((acc, el) => {
    acc+=el;
    return acc;
}, 0) / 2);

const GENE_LENGTH = Math.floor(degs.reduce((acc, el) => {
    acc+=el;
    return acc;
}, 0) / 2);;

class Gene {
    constructor(startV){
        this.start = startV;
        this.keys = [];
        this.createGenes();
    }

    // генерировать пути

    createGenes() {
        this.keys = [this.start]; //номер стартовой вершины
        for(let j = 1; j < GENE_LENGTH; j++){
           
            let rand = Math.floor(Math.random() * matrix.length);
            while (rand == this.keys[j-1]){
                rand = Math.floor(Math.random() * matrix.length);
            }
            this.keys[j] = rand;
            
        }
        this.keys.push(this.start);
    }


    calcFitness(){ //здесь считаем кол-во пройденных рёбер
        let clonedMatrix = JSON.parse(JSON.stringify(matrix)); 
        let count = dfsForPath(clonedMatrix, 1, this.keys); //кол-во ребёр, пройденных правильно

        console.log(count / maxEdges, ' fitness');
        this.fitness = count / maxEdges;
        return count / maxEdges;

    }

    crossover(partner) { 

        const length = this.keys.length > partner.keys.length ? this.keys.length : partner.keys.length;
        const child = new Gene(this.start);
        
        const midpoint = Math.floor(Math.random() * length);

        for (let i = 0; i < length; i++){ //построение совершенно рандомное. Считаем fitness иначе
            if (i < midpoint) {
                child.keys[i] = this.keys[i]
            }
            else{
                child.keys[i] = partner.keys[i];
            }
        }

        return child;
    }

    mutate(mutationRate) {
        for(let i=1; i < this.keys.length; i+=1){
            if (Math.random() < mutationRate){
                this.keys[i] = generatePossiblePaths(matrix, this.keys[i-1])
            }
        }
    }
}

class Population {
    constructor(size, startV, mutationRate){
        this.size = size || 1;
        this.mutationRate = mutationRate
        this.members = [];

        for (let i=0; i < size; i++){
            this.members.push(new Gene(startV));
        }
    }

    _selectMembersForMating(){
        const matingPool = [];
        this.members.forEach((m) => {
            const f = Math.floor(m.calcFitness() * 100) || 1;

            for (let i=0; i < f; i++){
                matingPool.push(m);
            }
        })
        return matingPool;
    }
    
    _reproduce(matingPool) {
        for (let i = 0; i < this.members.length; i++){
            const parentA = matingPool[Math.floor(Math.random() * matingPool.length)];
            const parentB = matingPool[Math.floor(Math.random() * matingPool.length)];
           
            const child = parentA.crossover(parentB);

            child.mutate(this.mutationRate);

            this.members[i] = child;
        }
    }

    evolve(){

        let counter = 0;
        let pool;
        let toStop = false;
        let lastIndex;
        while (toStop == false){
            pool = this._selectMembersForMating();
            counter++;
            toStop = pool.some((item, index) => {
                lastIndex = index;
                return (item.calcFitness() == 1);
            }); 
            
            this._reproduce(pool);
        }
        return pool[lastIndex];
    }
    
}

function generate(populationSize, start, mutationRate) {
    const population = new Population(populationSize, start, mutationRate);
    console.log(population.evolve(), "полученный результат");
}

console.log(checkEulerPath());

if (checkEulerPath()) {
    generate(20, 0, 0.05);
}
