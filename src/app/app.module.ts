import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormAnswerComponent } from './form-answer/form-answer.component';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import {NgbModal, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StartUpComponent } from './start-up/start-up.component';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    FormAnswerComponent,
    QuestionDialogComponent,
    StartUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModalModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
