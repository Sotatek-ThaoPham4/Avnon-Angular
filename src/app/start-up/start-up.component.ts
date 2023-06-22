import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {QuestionDialogComponent} from '../question-dialog/question-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start-up',
  templateUrl: './start-up.component.html',
  styleUrls: ['./start-up.component.scss']
})
export class StartUpComponent {


  public constructor(private modalService: NgbModal,
                     private router: Router) {
  }


  public addQuestion(): void {
    const dialogRef = this.modalService.open(QuestionDialogComponent);
    dialogRef.closed.subscribe(_ => this.router.navigateByUrl('/form/builder'));
  }

}
