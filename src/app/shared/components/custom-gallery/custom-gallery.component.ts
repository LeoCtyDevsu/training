import { Component, Input } from '@angular/core';
import { BookModel } from '../../models/book.model';

@Component({
  selector: 'app-custom-gallery',
  templateUrl: './custom-gallery.component.html',
  styleUrls: ['./custom-gallery.component.scss']
})
export class CustomGalleryComponent {
  @Input() elements: BookModel[] = [];
  @Input() columns: string = 'col-3';
}
