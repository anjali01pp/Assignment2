import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment2';


  input:string = '';
  result:any = '';
  text :string="Cannot Divide with Zero";
 
  pressNum(num: string) {
    if (num === "." && this.input.includes(".")) {
      if (this.input === "") {
          return;
      } else if (this.input.endsWith(".")) {
          return;
      }
  }
    this.input = this.input + num
    this.calcAnswer();
  }

  // pressOperator(op: string) {
 

  //   const lastKey = this.input[this.input.length-1];
    
  //   if (lastKey === '/' && op === '*')  {
  //     this.result = ""; 

    
  //   }
    
  //   else if (lastKey === '+' || lastKey === '-'){
  //     this.result=eval(this.input)
  //   }
  //   if(lastKey === '%') {
  //     return;
  //   }
   
  //   this.input = this.input + op
  //   this.calcAnswer();
  // }
 
  pressOperator(op: string) {
  
    const lastKey = this.input[this.input.length - 1];
  
  
    if (lastKey === '/' && op === '*') {
      return;
    } else if (lastKey === '*' && op === '/') {
      return;
    }
  
    if (/[/+\-*]/.test(lastKey) && lastKey === op) {
      return;
    }
  
    this.input = this.input + op;
    this.calcAnswer();
  }
  clear() {
    if (this.input !== '') {
      this.input = this.input.slice(0, -1);
      this.calcAnswer();
     
    
    } else if (this.input == '') {
      this.result='';
    }
     if (this.result == this.text){
      this.result="";
    }
  
  }
 
  allClear() {
    this.result = '';
    this.input = '';
  }
  toggleNegation() {
    if (this.input !== '') {
      if (this.input.charAt(0) === '-') {
        this.input = this.input.slice(1); 
        this.result=eval(this.input)
      } else {
        this.input = '-' + this.input; 
        this.result=eval(this.input)
      }
    }
  }
 
  calcAnswer() {
    let formula = this.input;
    if (/[-+*/.]$/.test(formula)) {
      console.log("Formula is incomplete");
      this.result = "";
      return;
    }
  
    let lastKey = formula;
    if (lastKey === '.')  {
      formula=formula;
    }
 
    lastKey = formula;
 
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.')  {
      formula=formula;
    }
    if (formula.includes('%0')&& formula.includes('%')){
      formula = formula.replace(/(\d+)%0/g, '$1');
       this.input = formula
    }
    //let key = this.input[this.input.length-1];
    if (formula.includes('%')){
      // if(formula.includes('.')){
      //   formula = formula.replace(/(%?\d+(\.\d+)?)/g, function(match) {
      //     return match.startsWith('%') ? `(${match.slice(1)} / 100)` : match;
      //   });
      // }
    
    // // formula = formula.replace(/(\d+)%+/g, function(match, number) {
    // //   const num = parseFloat(number);
    // //   return (num / Math.pow(100, match.length - number.length)).toString();
    // // });
   if(formula.endsWith("%")){
    formula = formula.replace(/(\d+(\.\d*)?|\.\d+)%/g, function(match, number) {
      const num = parseFloat(number);
      return (num / 100).toString();
    });
  }
 
 
  else{
  formula = formula.replace(/%(\d+)/g, '* ($1 / 100)')
  }
    // formula = formula.replace(/(\d+)%+/g, function(match, number) {
    //   const num = parseFloat(number);
    //   return (num / Math.pow(100, match.length - number.length)).toString();
    // });
  }
    // console.log("Formula " +formula);
    // let res = eval(formula);
  
    // if (isNaN(res) ||!isFinite(res)){
    //   this.result =this.text;
    // }
    // else {
    //   this.result = eval(formula);
    // }
   
    try {
      let  cleanedInput = formula;
      if (formula.endsWith("%") ) {
        cleanedInput =  formula.replace(/(^|[^.\d])\.(\d+)%/g, '$10.$2');
      }
      else if(formula.startsWith("0") && !formula.startsWith("0.")){
         cleanedInput = formula.replace(/\b0+(\d+)\b/g, '$1');
      }
      let res = eval(cleanedInput);
      if (!isNaN(res) && isFinite(res)) {
        this.result = res.toString();
      } 
     else if (isNaN(res) ||!isFinite(res) ){
        this.result =this.text;
      }
      else {
        this.result = '';
      }
    } catch (error) {
      this.result = 'Invalid Input';
    }
  }
 
  getAnswer() {
   
    this.calcAnswer();
    if (/[-+*/.]$/.test(this.input)) {
      this.result = ""; 
      return;
    }
    if (this.result == "Invalid Input"){
      this.input="";
    }
    else if (this.result != this.text){
    this.input = this.result;
    }
    else if (this.result == this.text){
      this.result="";
    }
    if (this.input=="0"){
       this.input="0";
  }


  }
}
