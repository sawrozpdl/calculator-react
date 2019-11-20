import Stack from "./Stack";

class Equation {
  constructor(infix) {
    this.infix = infix;
    this.value = 0;
  }

  setEquation(infix) {
    this.infix = infix;
  }

  toArray() {
    return this.infix
      .replace(/\^/g, " ^ ") // (/^/g) ~ new RegExp("^", "g")
      .replace(/\+/g, " + ")
      .replace(/\-/g, " - ")
      .replace(/\*/g, " * ")
      .replace(/\//g, " / ")
      .replace(/\)/g, " ) ")
      .replace(/\(/g, " ( ")
      .replace(/  /g, " ")
      .trim()
      .split(" ");
  }

  isNumber(item) {
    return !isNaN(item);
  }

  getPrecedence(item) {
    if (item === "-" || item === "+") return 1;
    if (item === "*" || item === "/") return 2;
    if (item === "^") return 3;
    return 0; // so that operators accumulate on top of '(' successfully => priority less, appends stuff
  }

  hasHigherPrecedence(first, second) { // push second if true
    if (first === second && first === "^") return true; // exclusive case for ^
    return this.getPrecedence(first) > this.getPrecedence(second);
  }

  valueOf(after, before, operator) { // opposite due to pop pop
    if (operator === "+") return before + after;
    if (operator === "-") return before - after;
    if (operator === "*") return before * after;
    if (operator === "/") return before / after;
    return Math.pow(before, after);
  }

  getPostfixArray() {
    let infixArr = this.toArray();
    let str = "";
    let stack = new Stack();
    infixArr.forEach(elem => {
      let op = elem.charAt(0);
      if (this.isNumber(op)) {
        if (str === "") str = str + elem; 
        else str = str + " " + elem;
      } else {
        if (op === "(")
          // just pushing ( to stack without any comparisons and stuffs
          stack.push(op);
        else if (op === ")") {
          // popping out all operators inside ( )
          while (!stack.isEmpty() && stack.peek() != "(")
            str = str + " " + stack.pop();
          stack.pop(); // since the above while doesn't get to ( so we pop it out
        } else {
          // ;
          if (stack.isEmpty() || this.hasHigherPrecedence(op, stack.peek()))
            stack.push(op);
          else {
            while (
              !stack.isEmpty() &&
              this.getPrecedence(stack.peek()) >= this.getPrecedence(op) // has to keep the loop running till it we have - versus * where we leave - on the stack; ref-"a-b*c^d*k"
            )
              str = str + " " + stack.pop();
            stack.push(op); // same ref; we add * to the remaining - (which had less or equal precedence than *)
          }
        }
      }
    });
    while (
      !stack.isEmpty() // at last we pop all the operators in stack and append to final string
    )
      str = str + " " + stack.pop();
    return str.split(" ");
  }

  evaluate() {
    let stack = new Stack();
    this.getPostfixArray().forEach(item => {
      if (this.isNumber(item.charAt(0))) stack.push(item);
      else stack.push(this.valueOf(stack.pop(), stack.pop(), item.charAt(0)));
    });
    this.value = stack.pop();
    return this;
  }

  getValue() {
    return this.value;
  }
}

export default Equation;
