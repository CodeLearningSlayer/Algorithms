"use strict"

const matrix = [
    [-1, 10, -1, 2, 4, -1, -1],
    [-1, -1, 5, 7, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, 8],
    [-1, -1, 6, -1, -1, -1, 2],
    [-1, -1, -1, -1, -1, 10, -1],
    [-1, -1, -1, -1, -1, -1, 13],
    [-1, -1, -1, -1, -1, -1, -1]
]

const findStock = () => {
    let stock = 0;

    for (let row of matrix){
        let isSource = row.every((item) => item === -1)
        if (isSource){
            stock = matrix.indexOf(row);
            break;
        }
    }
    return stock;
}

const findSource = () => {
    let counter = 0;
    let currIndex = 0;
    while (counter < matrix.length){
        for (let i=0; i<matrix.length; i++){
            if (matrix[i][currIndex] = -1){
                counter+=1;
                continue;
            }
            else{
                currIndex+=1;
                break;
            }
        }
    }
    return currIndex;
}

const SOURCE = findSource();
const STOCK = findStock();

const bfs = (s, matrix, end) => {
    let queue = [];
    let visited = Array(matrix.length).fill(false);
    let prev = [];
    let path = [];
    let minCapacity = 100;
    queue.push(s);
    visited[s] = true;
    while (queue.length > 0){
        let v = queue.shift();
        for (let neighbor in matrix[v]){
            if(!visited[neighbor] && matrix[v][neighbor] != -1){
                prev[neighbor] = v;
                
                queue.push(+neighbor);
                visited[+neighbor] = true;
                if(neighbor == end) {
                    
                    let curr = +end;
                    while (curr != null){
                        path.push(curr);
                        curr = prev[curr];
                    }
                    path.reverse();
                    for (let i=1; i<path.length; i++){
                        minCapacity = Math.min(minCapacity, matrix[path[i-1]][path[i]]);
                    }
                    return [path, minCapacity];
                }
            }
        }
    }
    return false;
}



const capacitySubtraction = (path, capacity, clonedMatrix) => {

    for (let i = 1; i < path.length; i++){
        clonedMatrix[path[i-1]][path[i]] -= capacity;
        if (clonedMatrix[path[i-1]][path[i]] === 0){
            clonedMatrix[path[i-1]][path[i]] = -1;
        }
    }

    return clonedMatrix;
}

//будем строить и уменьшать до тех пор, пока будет возможность

const fordFalkerson  = () => {
    let clonedMatrix = JSON.parse(JSON.stringify(matrix));
    let maxFlow = 0;

    while (bfs(SOURCE, clonedMatrix, STOCK))
        {
            const [path, minCapacity] = bfs(SOURCE, clonedMatrix, STOCK);
            maxFlow += minCapacity;   
            capacitySubtraction(path, minCapacity, clonedMatrix);
        }
        
    return maxFlow;
}

console.log(fordFalkerson());