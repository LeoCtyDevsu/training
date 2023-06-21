import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, BlankComponent, LayoutComponent],
  imports: [BrowserModule, SharedModule, AppRoutingModule],
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor, tokenInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
