import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApisService } from 'src/app/apis.service';
@Component({
  selector: 'app-csv-loader',
  templateUrl: './csv-loader.component.html',
  styleUrls: ['./csv-loader.component.css']
})
export class CsvLoaderComponent {
  feedback: string = '';
  form: FormGroup;
  @ViewChild('submit') submit!: ElementRef;
  list: any[] = new Array()
  file: any;


  constructor(private service: ApisService) {
    this.form = new FormGroup({
      csv: new FormControl('', [Validators.required]),
    });
  }

  fileChanged(e: any) {
    this.file = e.target.files[0];
  }
  submitFile() {
    let fileReader: FileReader = new FileReader();
    let bodyRequest
    fileReader.readAsText(this.file)
    fileReader.onload = (e) => {
      let result = fileReader.result as string;
      let spl1 = result.split("\n")
      let headers = spl1[0].split(",")
      let domande = new Array();
      for (let i = 1; i < spl1.length; i++) {
        let spl2 = spl1[i].split(",")
        let domanda = { id: spl2[0], domanda: spl2[1], risposte: [{ risposta: spl2[2] }, { risposta: spl2[3] }, { risposta: spl2[4] }, { risposta: spl2[5] }] }
        domande.push(domanda)
      }
      let bodyRequest = { "questions": domande }
      console.log(JSON.stringify(bodyRequest))
      this.service.putQuiz(bodyRequest).subscribe((response) => {
        if (response.statusCode == 200) {
          this.feedback = 'quiz aggiunto con successo!';
          this.form.reset()
        } else {
          this.feedback = response.msg;
        }
      });
    }
  }
}
