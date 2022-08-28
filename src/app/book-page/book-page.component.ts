import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BooksStore} from "./books.store";
import {ActivatedRoute} from "@angular/router";
import {BookDto} from "./BookDto";
import { AbstractControl, FormGroup } from "@angular/forms";
import {FormService} from "../common/form-service";

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {

  bookList$ : Observable<BookDto[]> = this.booksStore.bookDtoList$;
  favouriteBookList$ : Observable<BookDto[]> = this.booksStore.userPreferredBookList$;
  defaultId = 1;

  bookFg: FormGroup;
  bookDto: BookDto;

  constructor(private route: ActivatedRoute,
              private formService: FormService,
              private readonly booksStore: BooksStore) {}

  ngOnInit(): void {
    this.makeBookForm(new BookDto());
  }

  makeBookForm(bookDto: BookDto): void {
    this.bookFg = this.formService.makeBlankForm(bookDto);
  }




  saveBook() {
    const bookDto = new BookDto(this.bookFg.value);
    if (bookDto.id == null) {
      bookDto.id = this.defaultId;
    }

    this.booksStore.addBook({...bookDto});
    this.defaultId = this.defaultId + 1;
    this.makeBookForm(new BookDto());
  }

  update(book: BookDto) {
    this.booksStore.updateBook({ ...book, name: "Updated " + book.name });
  }

  remove(book: BookDto) {
    this.booksStore.removeBook({ ...book});
  }

  resetBookState() {
    this.booksStore.resetBookState();
    this.defaultId = 1;
  }


  favourite(book: BookDto) {
    this.booksStore.addFavouriteBook({ ...book});

  }

}
