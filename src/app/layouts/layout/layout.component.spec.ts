import { ComponentFixture, TestBed } from '@angular/core/testing';
import { userServiceMock } from 'src/app/shared/constants/mock.services';
import { UserService } from 'src/app/shared/services/user.service';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      providers: [{provide: UserService, useValue: userServiceMock }]
    });
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('create layout component', () => {
    const currentUser = userService.getUser();
    expect(component).toBeTruthy();
    expect(currentUser).toBeDefined();
  });

  it('user must have a name', () => {
    const currentUser = userService.getUser();
    expect(currentUser.username).toBe('mockData');
  });
});
