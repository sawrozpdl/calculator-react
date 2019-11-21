import Stack from "./Stack";

class Equation {
  constructor(infix) {
    this.infix = infix;
    this.value = 0;
  }

  setEquation(infix) {
    this.infix = infix;
    return this;
  }

  toArray() {
    return this.infix
      .replace(/\^/g, " ^ ") // (/^/g) ~ new RegExp("^", "g")
      .replace(/\%/g, " % ")
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
    if (item === "^" || item === "%") return 3;
    return 0; // so that operators accumulate on top of '(' successfully => priority less, appends stuff
  }

  hasHigherPrecedence(first, second) {
    // push second if true
    if (first === second && first === "^") return true; // exclusive case for ^
    return this.getPrecedence(first) > this.getPrecedence(second);
  }

  valueOf(after, before, operator) {
    switch (operator) { // opposite due to pop pop
      case "+":
        return +before + +after;
      case "-":
        return before - after;
      case "*":
        return before * after;
      case "/":
        return before / after;
      case "%":
        return before % after;
      default:
        return before ^ after;
    }
  }

  getPostfixArray() {
    let infixArr = this.toArray();
    let postfixArr = [];
    let stack = new Stack();
    infixArr.forEach(elem => {
      let sample = elem.charAt(0);
      if (this.isNumber(sample)) {
        postfixArr.push(elem);
      } else {
        if (sample === "(")
          stack.push(sample); // just pushing ( to stack without any comparisons and stuffs
        else if (sample === ")") {
          while (!stack.isEmpty() && stack.peek() != "(") // popping out all operators inside ( )
            postfixArr.push(stack.pop());
          stack.pop(); // since the above while doesn't get to ( so we pop it out
        } else {
          if (stack.isEmpty() || this.hasHigherPrecedence(sample, stack.peek()))
            stack.push(sample);
          else {
            while (
              !stack.isEmpty() &&
              this.getPrecedence(stack.peek()) >= this.getPrecedence(sample) // has to keep the loop running till it we have - versus * where we leave - on the stack; ref-"a-b*c^d*k"
            )
              postfixArr.push(stack.pop());
            stack.push(sample); // same ref; we add * to the remaining - (which had less or equal precedence than *)
          }
        }
      }
    });
    while (
      !stack.isEmpty() // at last we pop all the operators in stack and append to final string
    )
      postfixArr.push(stack.pop());
    return postfixArr;
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
