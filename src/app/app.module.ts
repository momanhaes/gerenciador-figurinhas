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
import { ButtonComponent } from './components/button/button.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './pages/login/login.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InputComponent } from './components/input/input.component';
import { SidebarComponent } from './fragments/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginFormComponent } from './fragments/login-form/login-form.component';
import { ProfileFormComponent } from './fragments/profile-form/profile-form.component';
import { RegisterFormComponent } from './fragments/register-form/register-form.component';

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
  LoginComponent,
  InputComponent,
  HeaderComponent,
  FooterComponent,
  ButtonComponent,
  ResizeDirective,
  SidebarComponent,
  SpinnerComponent,
  NotFoundComponent,
  SnackbarComponent,
  LoginFormComponent,
  ProfileFormComponent,
  RegisterFormComponent,
];

const ANGULAR_MODULES = [
  FormsModule,
  BrowserModule,
  HttpClientModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  RouterModule.forRoot(ROUTES),
];

const MATERIAL_MODULES = [
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatButtonModule,
  MatSelectModule,
  MatTableModule,
  MatInputModule,
  MatIconModule,
  MatSortModule,
  MatMenuModule,
  MatCardModule,
];

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    ...ANGULAR_MODULES, 
    ...MATERIAL_MODULES
  ],
  providers: [
    ...PROVIDERS
  ],
  bootstrap: [
    ...BOOTSTRAP
  ],
})
export class AppModule {}
