import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentPageRoutingModule } from './parent-page-routing.module';
import { ParentPageComponent } from './parent-page.component';
import {DressPageModule} from "../dress-page/dress-page.module";
import {BookPageModule} from "../book-page/book-page.module";


@NgModule({
  declarations: [
    ParentPageComponent
  ],
  imports: [
    CommonModule,
    ParentPageRoutingModule,
    DressPageModule,
    BookPageModule
  ]
})
export class ParentPageModule { }
