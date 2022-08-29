import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list/books-list.component';
import { RouterModule } from '@angular/router';
import { BooksApiEffects } from './store/books-api.effects';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksPageComponent } from './books-page/books-page.component';
import { BooksTotalComponent } from './books-total/books-total.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedStateBooksModule } from './store/state';



@NgModule({
  declarations: [
    BooksListComponent,
    BookDetailComponent,
    BooksPageComponent,
    BooksTotalComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: BooksPageComponent },
    ]),
    EffectsModule.forFeature([BooksApiEffects]),
    SharedStateBooksModule
  ]
})
export class BooksModule { }
