import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  x : number =0;
  domandeJson : any[] = [
    {
    domanda:"cosa beve spesso Edoardo?",
    risposte:["acqua","fanta","spremuta di carciofo","Monster"]},
    {
      domanda:"Ci piace Java?",
      risposte:["no","si","JAVA?","OVVIO"]
    }
]
  risposteCorrette:String[] = [];

ngOnInit(): void {
  for(let i =0; i<this.domandeJson.length;i++){
    this.risposteCorrette.push(this.domandeJson[i].risposte[3])
  }
 console.log(this.risposteCorrette)
}


  avanti(risposta:any){


    if(risposta == this.risposteCorrette[this.x]){
      console.log("BRAVO")
    }else{
      console.log("risposta sbagliata")
    }

    if(this.x!= this.domandeJson.length-1){
    this.x++}else{this.x=0}
  }
}
