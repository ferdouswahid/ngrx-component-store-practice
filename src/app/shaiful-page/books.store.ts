import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Store} from "@ngrx/store";
import {linkToGlobalState} from "../ComponentStateReducer";


export interface Book {
  id: number;
  name: string;
  description?: string;
}

export interface BooksState {
  books: Book[];
  userPreferredBooksIds: number[];
}

export const initialState: BooksState = {
  books: [],
  userPreferredBooksIds: []
};

@Injectable()
export class BooksStore extends ComponentStore<BooksState> {

  constructor(private globalStore: Store) {
    super(initialState);
    linkToGlobalState(this.state$, 'BooksState', this.globalStore);
  }

  readonly books$ = this.select(state => state.books);

  readonly addBook = this.updater((state: BooksState, book: Book) => {
      return {
        ...state,
        books: [...state.books, book]
      }
    }
  );

  readonly updateBook = this.updater((state: BooksState, book: Book) => {
      const newBookList: Book[] = Object.assign([], state.books);
      const index = newBookList.findIndex(val => val.id == book.id);
      newBookList[index] = book;

      return {
        ...state,
        books: newBookList,
      };
    }
  );

  readonly removeBook = this.updater((state: BooksState, book: Book) => {
      const newBookList: Book[] = Object.assign([], state.books);
      const removeBookList = newBookList.filter(val => val.id !== book.id);
      return {
        ...state,
        books: removeBookList,
      };
    }
  );

  readonly resetBooks = this.updater((state: BooksState) => {
      return {
        ...state, ...initialState
      }
    }
  );


  // favourite
  readonly userPreferredBookIds$ = this.select(state => state.userPreferredBooksIds);

  readonly userPreferredBooks$ = this.select(
    this.books$,
    this.userPreferredBookIds$,
    (books, ids) => books.filter(book => ids.includes(book.id)),
    {debounce: true}, // setting this selector to debounce
  );

  readonly addFavouriteBook = this.updater((state: BooksState, book: Book) => {
    const newList: number[] = Object.assign([], state.userPreferredBooksIds);
    if(newList.includes(book.id)){
      return {
        ...state
      }
    }else{
      return {
        ...state,
        userPreferredBooksIds: [...state.userPreferredBooksIds, book.id]
      }
    }

    }
  );

}
