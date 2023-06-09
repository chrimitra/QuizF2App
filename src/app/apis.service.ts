import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApisService {
  constructor(private http: HttpClient) {}
  putQuiz(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>('http://192.168.1.232:6050/putQuiz', data);
  }
  getRandomQuestions(questions: number): Observable<any[]> {
    return this.http.get<any[]>(
      'http://192.168.1.232:6050/getRandomQuestions/' + questions
    );
  }
  putRisultati(data: any): Observable<any> {
    return this.http.post<any>('http://192.168.1.232:6050/putRisultati', data);
  }
}
