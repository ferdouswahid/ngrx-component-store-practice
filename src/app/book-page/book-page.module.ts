import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookPageRoutingModule } from './book-page-routing.module';
import { BookPageComponent } from './book-page.component';
import {BooksStore} from "./books.store";


@NgModule({
  declarations: [
    BookPageComponent
  ],
  imports: [
    CommonModule,
    BookPageRoutingModule
  ],
  exports: [
    BookPageComponent
  ],
  providers:[
    BooksStore
  ]
})
export class BookPageModule { }
