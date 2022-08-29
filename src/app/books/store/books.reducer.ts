import { createReducer, on, createSelector } from '@ngrx/store';
import { BookModel } from '../book.model';
import { BooksPageActions, BooksApiActions } from './index';
import * as reducerHelper from './reducer.helper'

//Interfaces Intialization Start
export interface State {
  collection: BookModel[];
  selectedBookId: string | null;
}

export const intialState: State = {
  collection: [],
  selectedBookId: null,
  // error: null,
  // loading:true,
}

//Interfaces Intialization End

//Reducers Start
export const reducer = createReducer(
  intialState,
  on(BooksPageActions.enter, BooksPageActions.clearSelectedBook, (state: State, action): State => {
    return {
      ...state,
      selectedBookId: null,
    }
  }),
  on(BooksPageActions.selectBook, (state: State, action): State => {
    return {
      ...state,
      selectedBookId: action.bookId
    }
  }),
  on(BooksApiActions.booksLoaded, (state, action) => {
    return {
      ...state,
      collection: action.books
    }
  }),
  on(BooksApiActions.bookCreated, (state, action) => {
    console.log('bookCreated ', state)
    return {
      collection: reducerHelper.createBook(state.collection, action.book),
      selectedBookId: null
    }
  }),
  on(BooksApiActions.bookUpdated, (state, action) => {
    return {
      collection: reducerHelper.updateBook(state.collection, action.book),
      selectedBookId: null
    }
  }),
  on(BooksApiActions.bookDeleted, (state, action) => {
    return {
      collection: reducerHelper.deleteBook(state.collection, action.bookId),
      selectedBookId: null
    }
  })
);
//Reducers End

//Selectors Start
export const selectAll = (state: State) =>  state.collection;
export const selectActiveBookID = (state: State) => state.selectedBookId;
//selectActiveBook without using NGRX tools
// export const selectActiveBook = (state: State) => {
//   const books = state.collection;
//   const activeBookID = state.selectedBookId;
//   return findBook(books, activeBookID);
// }
//By using this approach less poilerplate is written and we ar depending on NgRx to memoize the state to increase perfromance
/**
 * The createSelector function takes a number of inputs,inputs are also selectors, so we are combining many selectors and each input selector returns a value that we use as an argument to the projector callback function that we pass to creaate selector as the last parameter.
 * So the entire application State is composed from small selectors (slices of data) which we can combine at any level of the application and get only the piece of state that we need in each section of the application.
 * So the approach to create more mini selectors and connecting them to form a tree of data and with this approach we give NgRx the ability to memoize and only re-compute the state when one of the inputs changes.
 */
export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookID,
  //the last argument is the callback function and it takes the parameters in the order they were passed in the createSelector helper 
  reducerHelper.findBook,
  // (books, selectActiveBookID) => {
  //   return findBook(books, selectActiveBookID)
  // }
);
export const selectEarningsTotal = createSelector(
  selectAll,
  reducerHelper.calculateBooksGrossEarnings
)
  