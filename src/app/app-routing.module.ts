import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormBuilderComponent} from './form-builder/form-builder.component';
import {FormAnswerComponent} from './form-answer/form-answer.component';
import {StartUpComponent} from './start-up/start-up.component';

const routes: Routes = [
  {
    path: '',
    component: StartUpComponent,
    pathMatch: 'full'
  },
  {
    path: 'form/builder',
    component: FormBuilderComponent
  },
  {
    path: 'form/answer',
    component: FormAnswerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
