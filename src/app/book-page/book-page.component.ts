import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BooksStore} from "./books.store";
import {ActivatedRoute} from "@angular/router";
import {BookDto} from "./BookDto";

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {

  bookList$ : Observable<BookDto[]> = this.booksStore.bookDtoList$;
  favouriteBookList$ : Observable<BookDto[]> = this.booksStore.userPreferredBookList$;
  defaultId = 1;

  constructor(private route: ActivatedRoute,
              private readonly booksStore: BooksStore) {}

  ngOnInit(): void {
  }


  add(bookName: string) {
    this.booksStore.addBook({ name: bookName + this.defaultId, id: this.defaultId });
    this.defaultId = this.defaultId + 1;
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
