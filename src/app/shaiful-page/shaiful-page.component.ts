import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Book, BooksStore} from "../shaiful-page/books.store";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-shaiful-page',
  templateUrl: './shaiful-page.component.html',
  styleUrls: ['./shaiful-page.component.scss']
})
export class ShaifulPageComponent implements OnInit {

  books$ : Observable<Book[]> = this.booksStore.books$;
  favouriteBooks$ : Observable<Book[]> = this.booksStore.userPreferredBooks$;

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

  resetBooks() {
    this.booksStore.resetBooks();
    this.defaultId = 1;
  }


  favourite(book: Book) {
    this.booksStore.addFavouriteBook({ ...book});

  }

}
