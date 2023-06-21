import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { authenticationGuard } from './shared/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'admin',
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/core/core.module').then((m) => m.CoreModule),
    canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
