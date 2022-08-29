import { BookModel } from "../book.model";

export const createBook = (books: BookModel[], book: BookModel) => [...books, book];

export const updateBook = (books: BookModel[], changes: BookModel) =>

  books.map((book) => {

    return book.id === changes.id ? Object.assign({}, book, changes) : book;

  });

export const deleteBook = (books: BookModel[], bookId: string) =>

  books.filter((book) => bookId !== book.id);



export const findBook = (books: BookModel[], bookId: string | null)  =>

  books.find((book) => book.id === bookId) || null;