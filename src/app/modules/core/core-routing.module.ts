import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { bookResolver } from 'src/app/shared/resolvers/book.resolver';
import { DetailBookComponent } from './components/detail-book/detail-book.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/books',
    pathMatch: 'full',
  },
  {
    path: 'books',
    component: DashboardComponent,
  },
  {
    path: 'my-books',
    component: MyBooksComponent,
  },
  {
    path: 'books/create/:id',
    component: CreateBookComponent,
    resolve: { book: bookResolver },
  },
  {
    path: 'books/create',
    component: CreateBookComponent,
  },
  {
    path: 'books/view/:id',
    component: DetailBookComponent,
    resolve: { book: bookResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
