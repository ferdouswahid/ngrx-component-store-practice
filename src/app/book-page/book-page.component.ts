import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Book, BooksStore} from "./books.store";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {

  bookList$ : Observable<Book[]> = this.booksStore.bookList$;
  favouriteBookList$ : Observable<Book[]> = this.booksStore.userPreferredBookList$;
  defaultId = 1;

  constructor(private route: ActivatedRoute,
              private readonly booksStore: BooksStore) {}

  ngOnInit(): void {
  }


  add(bookName: string) {
    this.booksStore.addBook({ name: bookName + this.defaultId, id: this.defaultId });
    this.defaultId = this.defaultId + 1;
  }

  update(book: Book) {
    this.booksStore.updateBook({ ...book, name: "Updated " + book.name });
  }

  remove(book: Book) {
    this.booksStore.removeBook({ ...book});
  }

  resetBookState() {
    this.booksStore.resetBookState();
    this.defaultId = 1;
  }


  favourite(book: Book) {
    this.booksStore.addFavouriteBook({ ...book});

  }

}