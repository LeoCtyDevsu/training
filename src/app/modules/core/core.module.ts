import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailBookComponent } from './components/detail-book/detail-book.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateBookComponent,
    DashboardComponent,
    DetailBookComponent,
    MyBooksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
