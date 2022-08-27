import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Store} from "@ngrx/store";
import {linkToGlobalState} from "../ComponentStateReducer";


export interface Movie {
  id: number;
  name: string;
  description?: string;
}

export interface MoviesState {
  movies: Movie[];
  userPreferredMoviesIds: number[];
}

export const initialState: MoviesState = {
  movies: [],
  userPreferredMoviesIds: []
};

@Injectable()
export class MoviesStore extends ComponentStore<MoviesState> {

  constructor(private globalStore: Store) {
    super(initialState);
    linkToGlobalState(this.state$, 'MoviesState', this.globalStore);
  }

  readonly movies$ = this.select(state => state.movies);

  readonly addMovie = this.updater((state: MoviesState, movie: Movie) => {
      return {
        ...state,
        movies: [...state.movies, movie]
      }
    }
  );

  readonly updateMovie = this.updater((state: MoviesState, movie: Movie) => {
      const newMovieList: Movie[] = Object.assign([], state.movies);
      const index = newMovieList.findIndex(val => val.id == movie.id);
      newMovieList[index] = movie;

      return {
        ...state,
        movies: newMovieList,
      };
    }
  );

  readonly removeMovie = this.updater((state: MoviesState, movie: Movie) => {
      const newMovieList: Movie[] = Object.assign([], state.movies);
      const removeMovieList = newMovieList.filter(val => val.id !== movie.id);
      return {
        ...state,
        movies: removeMovieList,
      };
    }
  );

  readonly resetMovies = this.updater((state: MoviesState) => {
      return {
        ...state, ...initialState
      }
    }
  );


  // favourite
  readonly userPreferredMovieIds$ = this.select(state => state.userPreferredMoviesIds);

  readonly userPreferredMovies$ = this.select(
    this.movies$,
    this.userPreferredMovieIds$,
    (movies, ids) => movies.filter(movie => ids.includes(movie.id)),
    {debounce: true}, // setting this selector to debounce
  );

  readonly addFavouriteMovie = this.updater((state: MoviesState, movie: Movie) => {
    const newList: number[] = Object.assign([], state.userPreferredMoviesIds);
    if(newList.includes(movie.id)){
      return {
        ...state
      }
    }else{
      return {
        ...state,
        userPreferredMoviesIds: [...state.userPreferredMoviesIds, movie.id]
      }
    }

    }
  );

}
