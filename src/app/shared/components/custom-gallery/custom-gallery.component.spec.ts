import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGalleryComponent } from './custom-gallery.component';
import { mockBook } from '../../constants/mock.models';
import { By } from '@angular/platform-browser';

describe('CustomGalleryComponent', () => {
  let component: CustomGalleryComponent;
  let fixture: ComponentFixture<CustomGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomGalleryComponent]
    });
    fixture = TestBed.createComponent(CustomGalleryComponent);
    component = fixture.componentInstance;
    component.columns = 'col-4';
    component.elements = [mockBook];
    fixture.detectChanges();
  });

  it('create custom gallery', () => {
    expect(component).toBeTruthy();
  });

  it('input params', () => {
    const { debugElement } = fixture;
    const customGalleryImages = debugElement.queryAll(
      By.css('[data-testid="custom-gallery-image"]')
    );
    expect(customGalleryImages).toHaveLength(1);
    expect(customGalleryImages[0].classes[component.columns]).toBeTruthy();
  });
});
