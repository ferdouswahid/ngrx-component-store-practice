import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentPageRoutingModule } from './parent-page-routing.module';
import { ParentPageComponent } from './parent-page.component';
import {DressPageModule} from "../dress-page/dress-page.module";
import {BookPageModule} from "../book-page/book-page.module";
import {StudentStore} from "./student.store";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";


@NgModule({
  declarations: [
    ParentPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,

    ParentPageRoutingModule,
    DressPageModule,
    BookPageModule
  ],
  providers:[
    StudentStore
  ]
})
export class ParentPageModule { }
