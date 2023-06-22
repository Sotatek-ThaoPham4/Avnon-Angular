import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionareService} from '../service/questionare.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent implements OnInit {

  public questionDialogForm!: FormGroup;
  public questionType!: FormControl;
  public questionContent!: FormControl;
  public specifyAns!: FormControl;
  public fieldConfig!: FormControl;

  public questionContentOfCheckboxType = new FormArray<any>([]);

  public isExitQuestionParagraph = false;

  public get questionContentOfCheckboxTypeControls(): FormControl[] {
    return this.questionContentOfCheckboxType.controls as FormControl[];
  }

  constructor(public activeModal: NgbActiveModal,
              private questionService: QuestionareService,
              private router: Router) {

    this.questionType = new FormControl('', [Validators.required]);
    this.questionContent = new FormControl('', [Validators.required]);
    this.specifyAns = new FormControl('');
    this.fieldConfig = new FormControl('');

    this.questionDialogForm = new FormGroup({
      questionType: this.questionType,
      questionContent: this.questionContent,
      specifyAns: this.specifyAns,
      fieldConfig: this.fieldConfig,
      questionContentOfCheckboxType: this.questionContentOfCheckboxType
    })
  }

  ngOnInit(): void {
  }

  public submitQuestion(): void {
    if (this.questionDialogForm.invalid) {
      return;
    }

    let answers;
    if (this.questionType.value === '1') {
      answers = this.questionContentOfCheckboxType.value;
    }
    const questionAndAns = {
      id: new Date().getTime(),
      type: this.questionType.value,
      questionName: this.questionContent.value,
      required: this.fieldConfig.value,
      answers
    }
    this.questionService.addQuestionAndAnswer(questionAndAns);
    this.activeModal.close();
  }

  public addAnotherAnswer(): void {
    if (this.questionContentOfCheckboxTypeControls.length >= 5) {
      return;
    }
    const questionContentForCheckboxControl = new FormControl('', [Validators.required]);
    (this.questionContentOfCheckboxType as FormArray).push(questionContentForCheckboxControl);
  }

  public changeQuestionType(): void {
    if (this.questionType.value === '1') {
      this.isExitQuestionParagraph = true;
      this.questionContentOfCheckboxType.addValidators(Validators.required)
      const questionContentForCheckboxControl = new FormControl('', [Validators.required]);
      (this.questionContentOfCheckboxType as FormArray).push(questionContentForCheckboxControl);
    } else {
      this.questionContentOfCheckboxType.removeValidators(Validators.required);
      this.questionContentOfCheckboxType = new FormArray<any>([]);
      this.isExitQuestionParagraph = false
    }
  }
}
