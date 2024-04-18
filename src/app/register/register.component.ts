import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showPasswordTip=false;

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService,private translate:TranslateService) {
      translate.setDefaultLang('en')
  }

  registerform = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control(false),
    balance: this.builder.control(0)
  });
  
  proceedregister() {
    if (this.registerform.valid) {
      this.service.checkUserExists(this.registerform.value.id!, this.registerform.value.email!).subscribe(user => {
        console.log(user);
        if (user && Object.keys(user).length > 0) {
          this.toastr.warning('Username or email already exists.');
        } else {
          this.service.RegisterUser(this.registerform.value.id, this.registerform.value)
          this.toastr.success('Registered successfully','Please contact admin for access at kktashev@gmail.com.')
          this.router.navigate(['login'])
        
      }
      });
    } else {
      this.toastr.warning('Please enter valid data. Your username should contain at least 3 letters. Your password should contain at least 8 characters, one uppercase letter, one lowercase letter, one digit and a special character')
    }
  }
  
  
  switchLanguage(language:string){
    this.translate.use(language);
  }
  showPasswordPattern() {
    this.showPasswordTip=true;
    this.toastr.info(
      'Username should contain at least 3 letters. The username cannot be changed, so be careful when setting it.'
    );
    this.toastr.info(
      'Password should contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and a special character.'
    );
  }
}