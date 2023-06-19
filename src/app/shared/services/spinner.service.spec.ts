import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('created spinner service', () => {
    service.spinnerSubject.next(true);
    service.spinner$.subscribe(state => {
      expect(state).toBeTruthy();
    })
    expect(service).toBeTruthy();
  });

  it('show spinner', () => {
    service.show();
    const isShowed = service.spinnerSubject.value;
    expect(isShowed).toBeTruthy();
  });

  it('hide spinner', () => {
    service.hide();
    const isShowed = service.spinnerSubject.value;
    expect(isShowed).toBeFalsy();
  });
});
