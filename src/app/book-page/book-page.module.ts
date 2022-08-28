import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';


import { BookPageRoutingModule } from './book-page-routing.module';
import { BookPageComponent } from './book-page.component';
import {BooksStore} from "./books.store";


@NgModule({
  declarations: [
    BookPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
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
