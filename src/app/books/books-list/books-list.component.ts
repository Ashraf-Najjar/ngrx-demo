import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookModel } from '../book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  @Input() books: BookModel[] | null = [];
  @Input() readonly: boolean | null = false;
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();
  constructor() {
   }

  ngOnInit(): void {
  }

}
