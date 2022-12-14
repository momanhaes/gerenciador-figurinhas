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
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
import { MenuComponent } from './fragments/menu/menu.component';
import { DialogComponent } from './fragments/dialog/dialog.component';
import { HeaderComponent } from './fragments/header/header.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { ProfileComponent } from './fragments/profile/profile.component';
import { SectionComponent } from './fragments/section/section.component';
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
  MenuComponent,
  LoginComponent,
  InputComponent,
  HeaderComponent,
  FooterComponent,
  ButtonComponent,
  ResizeDirective,
  DialogComponent,
  StickerComponent,
  SpinnerComponent,
  ProfileComponent,
  SectionComponent,
  NotFoundComponent,
  SnackbarComponent,
  LoginFormComponent,
  ProfileFormComponent,
  RegisterFormComponent,
];

const ANGULAR_MODULES = [
  FormsModule,
  BrowserModule,
  MatDialogModule,
  HttpClientModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  RouterModule.forRoot(ROUTES),
];

const MATERIAL_MODULES = [
  MatIconModule,
  MatTabsModule,
  MatInputModule,
  MatBadgeModule,
  MatSelectModule,
  MatButtonModule,
  MatSliderModule,
  MatDividerModule,
  MatExpansionModule,
  MatProgressBarModule,
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
