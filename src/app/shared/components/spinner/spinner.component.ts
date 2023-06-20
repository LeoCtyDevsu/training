import { Component, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() show: boolean = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(private _spinnerService: SpinnerService) {
    this._spinnerService.spinner$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((state: boolean) => {
        this.show = state;
      });
  }

  ngOnDestroy(): void {
    this.unSubscribeAll();
  }

  unSubscribeAll() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
