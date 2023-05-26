import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('nome') nome!: ElementRef;
  @ViewChild('cognome') cognome!: ElementRef;
  @ViewChild('email') email!: ElementRef;

  constructor(
    private router: Router){}

  salvaUtente(){
    let nome_registrazione = this.nome.nativeElement.value
    let cognome_registrazione = this.cognome.nativeElement.value
    let email_registrazione = this.email.nativeElement.value
    let regex = /[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}/g;

    if (nome_registrazione == null || nome_registrazione == ''){
      console.log("riempire tutti i campi")
      return
    }
    if (cognome_registrazione == null || cognome_registrazione == ''){
       console.log("riempire tutti i campi")
       return
      }
    if (email_registrazione == null || email_registrazione == ''){
       console.log("riempire tutti i campi")
       return
      }
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email_registrazione as string)){
      alert("formato mail non corretto")
      return
    }

      let persona = {
        nome: nome_registrazione,
        cognome : cognome_registrazione,
        email : email_registrazione
      }
      sessionStorage.setItem("UtenteLoggato",JSON.stringify(persona))
      this.router.navigateByUrl('quiz');



  }

}
