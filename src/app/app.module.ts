import { ROUTES } from './app.routes';
import { LOCALE_ID, NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ResizeDirective } from './directives/resize.directive';
import { HeaderComponent } from './fragments/header/header.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');

const BOOTSTRAP = [
  AppComponent
];

const PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'pt' },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

const DECLARATIONS = [
  AppComponent,
  ResizeDirective,
  FooterComponent,
  HeaderComponent,
  SnackbarComponent,
  NotFoundComponent,
];

const ANGULAR_MODULES = [
  FormsModule,
  BrowserModule,
  HttpClientModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  RouterModule.forRoot(ROUTES),
];

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    ...ANGULAR_MODULES
  ],
  providers: [
    ...PROVIDERS
  ],
  bootstrap: [
    ...BOOTSTRAP
  ],
})
export class AppModule {}
