import { NotificationService } from 'src/app/services/notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser, UserService } from 'src/app/services/user.service';
import { WindowService } from 'src/app/services/window.service';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { EMAIL_PATTERN } from 'src/app/utils/patterns';
import { ALERT_THEME } from 'src/app/utils/theme';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [APPEARD],
})
export class LoginComponent implements OnInit {
  public subscribeMobile!: Subscription;
  public alertTheme = ALERT_THEME;
  public isLogin: boolean = true;
  public registerForm!: FormGroup;
  public loginForm!: FormGroup;
  public isLoading!: boolean;
  public isMobile!: boolean;
  public state = 'ready';
  public user!: IUser;

  constructor(
    private router: Router,
    private userService: UserService,
    private windowService: WindowService,
    private notificationService: NotificationService
  ) { this.isMobile = window.innerWidth <= windowService.widthMobile; }

  ngOnInit(): void {
    this.subscribeMobile = this.windowService.isMobile.subscribe((isMobile: boolean) => (this.isMobile = isMobile));

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      password: new FormControl('', Validators.required),
    });

    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
      password: new FormControl('', Validators.required),
      passwordConfirmation: new FormControl('', Validators.required),
    });
  }

  public goRegister(): void {
    this.isLogin = false;
  }

  public showPassowordDontMatchError(): void {
    this.notificationService.showModal(
      'Ops!',
      'Suas senhas n??o coincidem.',
      'error',
      'Tentar novamente'
    );
  }

  public showError(error: any): void {
    this.notificationService.showModal(
      'Ops!',
      error ? error : 'Ocorreu um erro.',
      'error',
      'Ok'
    );
  }

  public showSuccess(client: IUser): void {
    this.notificationService.showModal(
      `Parab??ns, ${client.name}!`,
      'Voc?? efetuou seu cadastro com sucesso.',
      'success',
      'Ok'
    );
  }

  public login() {
    if (this.loginForm.invalid) { return;}

    const user = this.loginForm.value;
    this.isLoading = true;

    //TODO: Remover ap??s integra????o
    // this.userService.login(user.email, user.password).subscribe(
    //   (client) => this.notificationService.notify(`Bem-vindo, ${client.name}!`),
    //   (response) => {
    //     this.isLoading = false;
    //     this.showError(response.error.error);
    //   },
    //   () => {
    //     this.isLoading = false;
    //     this.router.navigate(['/home']);
    //   }
    // );

    const mock = {
      _id: '123456',
      token: '123456',
      name: 'Usu??rio',
      email: 'usuario@gmail.com',
      password: '123456',
    };

    //TODO: Alterar mock pela integra????o
    setTimeout(() => {
      this.notificationService.notify('Bem-vindo, Usu??rio!');
      this.userService.setToken('123456');
      this.userService.setUser(mock);
      this.isLoading = false;
      this.goHome();
    }, 1000);
  }

  public goHome() {
    this.router.navigate(['/home']);
  }

  public goLogin() {
    this.isLogin = true;
  }

  public clearRegisterForm() {
    this.registerForm.reset({
      name:'',
      email: [],
      password: '',
      passwordConfirmation: '',
    });
  }

  public register() {
    if (this.registerForm.invalid) { return; }

    const password = this.registerForm.get('password')?.value;
    const passwordConfirmation = this.registerForm.get('passwordConfirmation')?.value;

    if (password !== passwordConfirmation) {
      return this.showPassowordDontMatchError();
    }

    this.user = this.registerForm.value;
    this.isLoading = true;

    // this.userService
    //   .create(this.user)
    //   .pipe(
    //     catchError((err) => {
    //       this.showError(err.error.error);
    //       this.isLoading = false;
    //       return err;
    //     })
    //   )
    //   .subscribe((user) => {
    //     this.isLoading = false;
    //     this.showSuccess(user as IUser);
    //     this.goLogin();
    //   });

    const mock = {
      _id: '123456',
      token: '123456',
      name: 'Usu??rio',
      email: 'usuario@gmail.com',
      password: '123456',
    };

    setTimeout(() => {
      this.isLoading = false;
      this.showSuccess(mock);
      this.goLogin();
      this.clearRegisterForm();
    }, 1000);
  }
}
