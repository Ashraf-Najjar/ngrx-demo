import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-books-total',
  templateUrl: './books-total.component.html',
  styleUrls: ['./books-total.component.scss'],
})
export class BooksTotalComponent {
  @Input() total: number | null = 0;
}
