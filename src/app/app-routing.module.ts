import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { CsvLoaderComponent } from './components/csv-loader/csv-loader.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'csv-loader', component: CsvLoaderComponent },
  { path: '*', component: QuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
