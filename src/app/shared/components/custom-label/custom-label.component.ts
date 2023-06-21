import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-label',
  templateUrl: './custom-label.component.html',
  styleUrls: ['./custom-label.component.scss']
})
export class CustomLabelComponent {
  @Input() idElement: string = '';
  @Input() label: string = '';
  @Input() description: string | undefined = '';
  @Input() isURL: boolean = false;
}
