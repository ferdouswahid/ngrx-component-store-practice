import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShaifulPageRoutingModule } from './shaiful-page-routing.module';
import { ShaifulPageComponent } from './shaiful-page.component';
import {BooksStore} from "./books.store";


@NgModule({
  declarations: [
    ShaifulPageComponent
  ],
  imports: [
    CommonModule,
    ShaifulPageRoutingModule
  ],
  providers:[
    BooksStore
  ]
})
export class ShaifulPageModule { }
