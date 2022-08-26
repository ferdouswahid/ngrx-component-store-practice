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
  userPreferredMoviesIds: string[];
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

  readonly userPreferredMovieIds$ = this.select(state => state.userPreferredMoviesIds);


 /* readonly userPreferredMovies$ = this.select(
    this.movies$,
    this.userPreferredMovieIds$,
    (movies, ids) => movies.filter(movie => ids.includes(movie.id)),
    {debounce: true}, // 👈 setting this selector to debounce
  );*/

  readonly addMovie = this.updater((state:MoviesState, movie: Movie) => ({
      ...state, movies: [...state.movies, movie],
    })
  );

}
