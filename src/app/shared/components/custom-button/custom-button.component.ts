import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent {
  @Input() idElement: string = '';
  @Input() label: string = '';
  @Input() type: string = 'primary';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Output() onClickEvent: EventEmitter<boolean> = new EventEmitter();

  onClickEventNotification() {
    this.onClickEvent.emit(true);
  }
}
