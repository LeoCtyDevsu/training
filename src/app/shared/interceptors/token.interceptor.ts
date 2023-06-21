import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token: string | null = userService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer: ${token}`,
      },
    });
  }
  return next(req);
};
