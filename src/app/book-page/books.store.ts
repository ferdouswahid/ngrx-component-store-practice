import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Store} from "@ngrx/store";
import {linkToGlobalState} from "../ComponentStateReducer";
import {BookDto} from "./BookDto";

export class BooksState {
  bookDtoList: BookDto[];
  userPreferredBookIdList: number[];
}

export const initialState: BooksState = {
  bookDtoList: [],
  userPreferredBookIdList: []
};

@Injectable()
export class BooksStore extends ComponentStore<BooksState> {

  constructor(private globalStore: Store) {
    super(initialState);
    linkToGlobalState(this.state$, 'BooksState', this.globalStore);
  }

  readonly bookDtoList$ = this.select(state => state.bookDtoList);

  readonly addBook = this.updater((state: BooksState, book: BookDto) => {
      return {
        ...state,
        bookDtoList: [...state.bookDtoList, book]
      }
    }
  );

  readonly updateBook = this.updater((state: BooksState, book: BookDto) => {
      const newBookList: BookDto[] = Object.assign([], state.bookDtoList);
      const index = newBookList.findIndex(val => val.id == book.id);
      newBookList[index] = book;

      return {
        ...state,
        bookDtoList: newBookList,
      };
    }
  );

  readonly removeBook = this.updater((state: BooksState, book: BookDto) => {
      const newBookList: BookDto[] = Object.assign([], state.bookDtoList);
      const removeBookList = newBookList.filter(val => val.id !== book.id);
      return {
        ...state,
        bookDtoList: removeBookList,
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
    this.bookDtoList$,
    this.userPreferredBookIdList$,
    (books, ids) => books.filter(book => ids.includes(book.id??0)),
    {debounce: true}, // setting this selector to debounce
  );

  checkBookAlreadyExistInFavList(userPreferredBookIdList: Array<number>, bookId:number): boolean{
    return userPreferredBookIdList.includes(bookId);
  }

  getFavouriteIdList(userPreferredBookIdList: Array<number>, book:BookDto): Array<number>{
    if(!this.checkBookAlreadyExistInFavList(userPreferredBookIdList, book.id??0) && book.id){
      return [...userPreferredBookIdList, book.id]
    }
    return userPreferredBookIdList
  }

  readonly addFavouriteBook = this.updater((state: BooksState, book: BookDto) => ({
      ...state, userPreferredBookIdList: this.getFavouriteIdList(state.userPreferredBookIdList, book)
    })
  );



/*  readonly addFavouriteBook = this.updater((state: BooksState, book: BookDto) => {
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
  );*/

}
