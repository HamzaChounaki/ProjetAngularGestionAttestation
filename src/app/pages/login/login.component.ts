import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder,FormsModule, Validators,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  credentials = {
    username: '',
    password: ''
  };

  constructor(private fb: FormBuilder,
            private appService: AppService,
            private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }
  login(){
    this.appService.authenticate(this.credentials, ()=>{
    this.router.navigateByUrl('/region');
  });
  }
  ngOnDestroy() {
  }

}
