const readline = require("readline");
const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Stack {
    
    #stack = [];

    push(item) {
        this.#stack.push(item);
       
    }
    pop() {
        if(this.#stack.length === 0){
            return false;
        }
        return this.#stack.pop();
    }
    getTop() {
        return this.#stack.slice(-1)[0];
    }
    exist(){
        return this.#stack.length ? true : false;
    }
    print(){
        return this.#stack;
    }
}

main = () => {
    let clientExpression;
    readInterface.question("Enter your expression ", function(expression){
        clientExpression = expression.replaceAll(" ", "");
        console.log(inverse2(clientExpression));
        readInterface.close();
    })
}

inverse2 = (clientExpression) =>{
    let input = clientExpression;
    let output = "";
    let stack = new Stack();
    if (input[0] == "-"){
        input = '(0' + input;
        let i=2;
        while(/^\d+$/.test(input[i]) || input[i]==',' || input[i] == "."){
            i++;
        }
        input = input.slice(0, i) + ')' + input.slice(i+1);
    }
    let pos = -1;
    let buffArr = Array.from(input);
    let buffValue="";
    let inputArr = [];
    for(let i=0; i< buffArr.length; i++){
        if (/^\d+$/.test(input[i])){
            buffValue += input[i];
        }
        else{
            if  (buffValue.length>0){
                inputArr.push(buffValue);
                buffValue="";
            }
            inputArr.push(input[i]);
        }
    }
    inputArr.push(buffValue);
   

    let operations = ['(', ')', '+', '-', '*', '/', '^'];
    while(inputArr.some(item => operations.indexOf(item) > -1)){
        pos = inputArr.findIndex(item => operations.indexOf(item) > -1);
        // console.log(inputArr);
        if(pos > 0){
            output += inputArr.slice(0, pos);
            output += " ";
            inputArr.splice(0, pos);
        }
        else if(inputArr[pos]=='('){
            stack.push(inputArr[pos]);
            inputArr.splice(0, 1);
        }
        else if(inputArr[pos]==")"){
            let currChar;
            while ((currChar = stack.pop())!="("){
                output+=currChar;
                output+=" ";
            }
            inputArr.splice(0,1);
        }
        else{
            console.log(operations.indexOf(stack.getTop()) / 2 >= operations.indexOf(inputArr[pos]) / 2 );
            while(stack.exist() && operations.indexOf(stack.getTop()) / 2 >= operations.indexOf(inputArr[pos]) / 2 ) {
                output += stack.pop();
                output+= " ";

            }
            stack.push(inputArr[pos]); //проблема здесь, в pos
            
            inputArr.splice(0, 1);
        }
    };
    if (inputArr.length) output+=inputArr.join(" ");
    while (stack.exist()) {
        output+=stack.pop();
        output+=" ";
    }

    return output;
}

main();


