// INTERNAL //
import { ROUTES } from './app.routes';
// INTERNAL //

// ANGULAR //
import { RouterModule } from '@angular/router';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ANGULAR //

// MATERIAL //
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// MATERIAL //

// COMPONENTS //
import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StickerComponent } from './components/sticker/sticker.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
// COMPONENTS //

// FRAGMENTS //
import { HeaderComponent } from './fragments/header/header.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { SidebarComponent } from './fragments/sidebar/sidebar.component';
import { LoginFormComponent } from './fragments/login-form/login-form.component';
import { ProfileFormComponent } from './fragments/profile-form/profile-form.component';
import { RegisterFormComponent } from './fragments/register-form/register-form.component';
// FRAGMENTS //

// DIRECTIVES //
import { ResizeDirective } from './directives/resize.directive';
// DIRECTIVES //

// PAGES //
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
// PAGES //

// GUARDS //
import { LoginGuard } from './guards/login.guard';
import { LoggedInGuard } from './guards/loggedin.guard';
// GUARDS //

registerLocaleData(localePt, 'pt');

const BOOTSTRAP = [
  AppComponent
];

const GUARDS = [
  LoggedInGuard,
  LoginGuard,
]

const PROVIDERS = [
  ...GUARDS,
  { provide: LOCALE_ID, useValue: 'pt' },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

const DECLARATIONS = [
  AppComponent,
  HomeComponent,
  LoginComponent,
  InputComponent,
  HeaderComponent,
  FooterComponent,
  ButtonComponent,
  ResizeDirective,
  StickerComponent,
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
  MatIconModule,
  MatMenuModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatTooltipModule,
  MatDividerModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
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
