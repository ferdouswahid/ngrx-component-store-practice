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
  bookList: Book[];
  userPreferredBookIdList: number[];
}

export const initialState: BooksState = {
  bookList: [],
  userPreferredBookIdList: []
};

@Injectable()
export class BooksStore extends ComponentStore<BooksState> {

  constructor(private globalStore: Store) {
    super(initialState);
    linkToGlobalState(this.state$, 'BooksState', this.globalStore);
  }

  readonly bookList$ = this.select(state => state.bookList);

  readonly addBook = this.updater((state: BooksState, book: Book) => {
      return {
        ...state,
        bookList: [...state.bookList, book]
      }
    }
  );

  readonly updateBook = this.updater((state: BooksState, book: Book) => {
      const newBookList: Book[] = Object.assign([], state.bookList);
      const index = newBookList.findIndex(val => val.id == book.id);
      newBookList[index] = book;

      return {
        ...state,
        bookList: newBookList,
      };
    }
  );

  readonly removeBook = this.updater((state: BooksState, book: Book) => {
      const newBookList: Book[] = Object.assign([], state.bookList);
      const removeBookList = newBookList.filter(val => val.id !== book.id);
      return {
        ...state,
        bookList: removeBookList,
      };
    }
  );

  readonly resetBookState = this.updater((state: BooksState) => {
      return {
        ...state, ...initialState
      }
    }
  );


  // favourite
  readonly userPreferredBookIdList$ = this.select(state => state.userPreferredBookIdList);

  readonly userPreferredBookList$ = this.select(
    this.bookList$,
    this.userPreferredBookIdList$,
    (books, ids) => books.filter(book => ids.includes(book.id)),
    {debounce: true}, // setting this selector to debounce
  );

  readonly addFavouriteBook = this.updater((state: BooksState, book: Book) => {
    const newList: number[] = Object.assign([], state.userPreferredBookIdList);
    if(newList.includes(book.id)){
      return {
        ...state
      }
    }else{
      return {
        ...state,
        userPreferredBookIdList: [...state.userPreferredBookIdList, book.id]
      }
    }

    }
  );

}
