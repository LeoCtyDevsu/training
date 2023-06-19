import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { BlankComponent } from './blank.component';

describe('BlankComponent', () => {
  let component: BlankComponent;
  let fixture: ComponentFixture<BlankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlankComponent],
      imports: [RouterModule],
    });
    fixture = TestBed.createComponent(BlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create blank component', () => {
    expect(component).toBeTruthy();
  });
});
