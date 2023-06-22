import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionareService} from '../service/questionare.service';
import {
  FormArray,
  FormControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {QuestionDialogComponent} from '../question-dialog/question-dialog.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnDestroy {

  public questions: any[] = [];
  public questionName: any;

  public questionFormGroup = new UntypedFormGroup({});

  private _subscription = new Subscription();

  constructor(private questionService: QuestionareService,
              protected modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
    const getQuestionsSubscription = this.questionService.getQuestionAndAnswer().subscribe(questions => {
      const answers = this.questionService.getAnswers() || [];

      this.questions = questions;
      this.questions.forEach((q, index) => {
        if (q.type === '1') {
          const control: UntypedFormArray = new UntypedFormArray([]);
          if (q.required) {
            control.addValidators(Validators.required);
          }

          const controlAnswers: any[] = answers && answers[index] ? answers[index].answer : [];

          q.answers.forEach((_: any) => {
            (control as FormArray).push(new FormControl(controlAnswers.includes(_)));
          })

          this.questionFormGroup.addControl(q.id, control);
          return;
        }

        if (q.type === '2') {
          const value = answers && answers[index] && answers[index].answer
          const control = new UntypedFormControl(value);
          if (q.required) {
            control.addValidators(Validators.required);
          }
          this.questionFormGroup.addControl(q.id, control);
          return;
        }
      });
    });
    this._subscription.add(getQuestionsSubscription);
  }

  public getControl(name: string): any {
    return this.questionFormGroup.get(name.toString()) as any;
  }

  public saveAnswers(): void {
    this.questionFormGroup.markAllAsTouched();
    this.questionFormGroup.updateValueAndValidity();
    if (this.questionFormGroup.invalid) {
      return;
    }

    const formValue = this.questionFormGroup.value;

    const isFormHasAllValue = Object.values(formValue).every((value: any, index: number) => {
      if (!this.questions[index].required) {
        return true;
      }
      if (typeof value === 'object') {
        return (value as []).filter(_ => _).length > 0;
      }
      return value;
    });

    if (!isFormHasAllValue) {
      return;
    }

    this.questions.forEach(q => {
      if (q.type === '1') {
        const values = formValue[q.id];
        formValue[q.id] = q.answers.filter((value: boolean, index: number) => {
          return values[index];
        });
      }
    });

    const answers = this.questions.map(q => {
      return {
        id: q.id,
        questionName: q.questionName,
        answer: formValue[q.id]
      };
    });
    this.questionService.updateAnswers(answers);
    this.router.navigateByUrl('/form/answer');
  }

  public handleAddQuestion(): void {
    this.modalService.open(QuestionDialogComponent);
  }

  public checkMultipleChoiceValid(values: boolean[]): boolean {
    return values.filter(_ => _).length > 0;
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }
}
