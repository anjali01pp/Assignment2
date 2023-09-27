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
    if (num=="."  && this.input.includes(".") ) {
      if (this.input !="" ) {
    return;   
      }

    }
    this.input = this.input + num
    this.calcAnswer();
  }

  pressOperator(op: string) {
 

    const lastKey = this.input[this.input.length - 1];
    
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
      this.result = ""; 
      return;
    }
    if(lastKey === '%') {
      return;
    }
   
    this.input = this.input + op
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
        this.result=this.input
      } else {
        this.input = '-' + this.input; 
        this.result=this.input
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
    //  if(/[%]$/.test(formula)){
    //   formula = formula.replace(/(\d+)%+/g, '($1 / 100)');
    // //   formula = formula.replace(/(\d+)%+/g, function(match, number) {
    // //     const num = parseInt(number, 10);
    // //     const numberOfPercentSymbols = match.length - number.length;
    // //     const result = num / Math.pow(100, numberOfPercentSymbols);
    // //     return result.toFixed(6); // Adjust the number of decimal places as needed
    // //   });
      
    //  console.log(eval(formula))
    
    if (formula.includes('%0')&& formula.includes('%')){
      formula = formula.replace(/(\d+)%0/g, '$1');
       this.input = formula
    }
    if (formula.includes('%')){
    
     //formula = formula.replace(/%(\d+)/g, '* ($1 / 100)')
    // formula = formula.replace(/(\d+)%+/g, function(match, number) {
    //   const num = parseFloat(number);
    //   return (num / Math.pow(100, match.length - number.length)).toString();
    // });
    formula = formula.replace(/(\d+(\.\d+)?)%+/g, function(match, number) {
      const num = parseFloat(number);
      return (num / 100).toString();
    });
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
      let res = eval(formula);
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
