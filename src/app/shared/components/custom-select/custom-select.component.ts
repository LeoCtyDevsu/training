import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectItem } from '../../models/select-item.model';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {
  @Input() idElement: string = '';
  @Input() elements: SelectItem[] = [];
  @Input() label: string = '';
  @Output() onChangeEvent: EventEmitter<string> = new EventEmitter();

  onChangeEventNotification(value: string) {
    this.onChangeEvent.emit(value);
  }
}
