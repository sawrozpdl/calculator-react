class Stack { 
    
    constructor() { 
        this.array = []; 
    } 

    isEmpty() {
        return (this.array.length == 0);
    }

    push(item) {
        this.array.push(item);
    }
  
    pop() {
        if (this.isEmpty()) return;
        return this.array.pop();
    }

    peek() {
        return this.array[this.array.length - 1];
    }

    toString() {
        return this.array.toString();
    }
} 

export default Stack;