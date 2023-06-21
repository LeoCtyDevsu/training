import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const token = userService.getToken();
  if (token !== null && token !== '') {
    return true;
  } else {
    router.navigate(['/signin']);
    return false;
  }
};
