import { Component, OnInit } from '@angular/core';
import {QuestionareService} from '../service/questionare.service';

@Component({
  selector: 'app-form-answer',
  templateUrl: './form-answer.component.html',
  styleUrls: ['./form-answer.component.scss']
})
export class FormAnswerComponent implements OnInit {

  public answers: any[] = [];

  constructor(
    private questionService: QuestionareService
  ) { }

  ngOnInit(): void {
    this.answers = this.questionService.getAnswers();
  }

  public getTypeOfAnswer(value: any): string {
    return typeof value;
  }

}
