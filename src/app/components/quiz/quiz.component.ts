import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  x : number =0;
  domandeJson : any[] = [    //da definire nell oninit tramite chiamataa dynamo *-*-*-*-*-*-*-*-*-*-*-*-*-*
    {
    domanda:"cosa beve spesso Edoardo?",
    risposte:["acqua","fanta","spremuta di carciofo","Monster"]},
    {
      domanda:"Ci piace Java?",
      risposte:["no","si","JAVA?","OVVIO"]
    }
]
  risposteCorrette:String[] = [];

  risposteDate:any[] = [];

ngOnInit(): void {
  //salviamo le risposte giusta(per ora sempre nell'ultima posizione) in un array
  for(let i =0; i<this.domandeJson.length;i++){
    this.risposteCorrette.push(this.domandeJson[i].risposte[3])
  }
  //mischiamo le risposte per il quiz
 for(let i =0; i<this.domandeJson.length;i++){
  this.shuffle(this.domandeJson[i].risposte)
}

}


  avanti(rispostaInv:any,domandaInv:string){
    let rispostaJson ={
      domanda:domandaInv,
      risposta : rispostaInv,
      verifica : ""
    }

    //verifichiamo se la risposta è corretta o no
    if(rispostaInv == this.risposteCorrette[this.x]){
      rispostaJson.verifica ="Risposta giusta"
    }else{
      rispostaJson.verifica ="Risposta sbagliata"
    }
    //inseriamo il tutto nella lista di risposte dell'utente
    this.risposteDate.push(rispostaJson)


    //per mandare avanti le domande
    if(this.x!= this.domandeJson.length-1){
    this.x++
  }else{
    //quando si finisce il quiz, si salva tutto e viene inviato a db
      this.x=0;
      let JsonInvio = {
        utente:JSON.parse(sessionStorage.getItem("UtenteLoggato") as string),
        risposte : this.risposteDate
      }
      //da aggiungere invio a db invece che settarlo nella session *-*-*-*-*-*-*-*-*-*-*-*-*-*
      sessionStorage.setItem("provaInvio",JSON.stringify(JsonInvio))
    }
  }





  shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  };



}
