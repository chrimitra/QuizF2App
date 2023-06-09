import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApisService } from 'src/app/apis.service';
import optionsJSON from 'src/assets/options.json';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  finito: boolean = false;

  x: number = 0;

  domandeJson?: any[];

  risposteCorrette: String[] = [];

  risposteDate: any[] = [];

  @ViewChild('DivQuiz') DivQuiz!: ElementRef;
  @ViewChild('myBar') myBar!: ElementRef;

  numeroDomande: number = optionsJSON.defaultQuestions;

  durataDomanda: number = optionsJSON.AnswersTimerSeconds * 1000;

  secondiRimanenti!: number;

  rispostaData: boolean = false;

  intervallo!: any;

  numeroRisposteDate: number = 1;

  rispostaInv!: any;

  domandaInv!: any;

  width!: number;

  initialBar!: HTMLElement;

  selectedAnswer!: HTMLElement;
  //private servizio: DatiService,
  constructor(private service: ApisService) {}

  ngAfterViewInit() {
    this.width = (this.numeroRisposteDate * 100) / this.numeroDomande;
    this.initialBar = document.getElementById('myBar') as HTMLElement;
    this.initialBar.style.width = this.width.toString() + '%';
  }

  ngOnInit(): void {
    //estraiamo 30 domande dal db

    this.service.getRandomQuestions(this.numeroDomande).subscribe((domande) => {
      this.domandeJson = domande;
      this.domandaInv = this.domandeJson[this.x].domanda;

      //salviamo le risposte giusta(per ora sempre nella prima  posizione) in un array
      for (let i = 0; i < this.domandeJson.length; i++) {
        this.risposteCorrette.push(this.domandeJson[i].risposte[0]);
      }
      //mischiamo le risposte per il quiz
      for (let i = 0; i < this.domandeJson.length; i++) {
        this.shuffle(this.domandeJson[i].risposte);
      }
    });

    this.inizioTimerDomanda();
  }

  async inizioTimerDomanda() {
    this.rispostaData = false;
    let fineTempo = this.durataDomanda + new Date().getTime();
    this.intervallo = setInterval(() => {
      if (this.rispostaData) {
        return;
      }
      if (new Date().getTime() >= fineTempo && this.domandeJson) {
        this.rispostaInv = '';
        this.avanti();
      }
      this.secondiRimanenti = Math.ceil(
        (fineTempo - new Date().getTime()) / 1000
      );
    }, 1);
  }

  imposta(risposta: any, y: number) {
    this.rispostaInv = risposta;
    let button_choices = document.getElementsByClassName('answer-choices');
    button_choices[y].classList.add('answer-selected');

    for (let i = 0; i < button_choices.length; i++) {
      if (button_choices[i].classList.contains('answer-selected')) {
        button_choices[i].classList.remove('answer-selected');
        button_choices[y].classList.add('answer-selected');
      }
    }
  }

  avanti() {
    this.rispostaData = true;
    this.numeroRisposteDate++;
    this.width = (this.numeroRisposteDate * 100) / this.numeroDomande;
    this.myBar.nativeElement.style.width = this.width.toString() + '%';
    let rispostaJson = {
      domanda: this.domandaInv,
      risposta: this.rispostaInv,
      verifica: '',
    };

    //verifichiamo se la risposta è corretta o no
    if (this.rispostaInv == this.risposteCorrette[this.x]) {
      rispostaJson.verifica = 'Risposta giusta';
    } else if (this.rispostaInv == '') {
      rispostaJson.verifica = 'Risposta non data';
    } else {
      rispostaJson.verifica = 'Risposta sbagliata';
    }
    //inseriamo il tutto nella lista di risposte dell'utente
    this.risposteDate.push(rispostaJson);

    //per mandare avanti le domande
    if (this.x != this.domandeJson!.length - 1) {
      this.x++;
      clearInterval(this.intervallo);
      this.intervallo = null;
      this.inizioTimerDomanda();
      this.rispostaInv = '';
      if (this.domandeJson) {
        this.domandaInv = this.domandeJson[this.x].domanda;
      }
    } else {
      //quando si finisce il quiz, si salva tutto e viene inviato a db
      this.x = 0;
      let JsonInvio = {
        utente: JSON.parse(sessionStorage.getItem('UtenteLoggato') as string),
        risposte: this.risposteDate,
      };
      // this.DivQuiz.nativeElement.style.visibility = 'hidden';
      this.finito = true;
      //da aggiungere invio a db invece che settarlo nella session *-*-*-*-*-*-*-*-*-*-*-*-*-*
      sessionStorage.setItem('provaInvio', JSON.stringify(JsonInvio));
      //this.service.putRisultati(JsonInvio).subscribe()
    }
  }

  shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
}
