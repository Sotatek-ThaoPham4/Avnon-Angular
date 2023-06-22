import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionareService {

  protected questionList: any[] = [];

  protected questionList$ = new BehaviorSubject(this.questionList);

  protected answers: any[] = [];

  constructor() { }

  public addQuestionAndAnswer(questions: any) {
    this.questionList.push(questions);
    this.questionList$.next(this.questionList);
  }

  public getQuestionAndAnswer(): Observable<any> {
    return this.questionList$.asObservable();
  }

  public updateAnswers(answers: any[]): void {
    this.answers = answers;
  }

  public getAnswers(): any[] {
    return this.answers;
  }
}
