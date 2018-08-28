import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../app.service';
import { LoginUser } from './loginuser';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private  apiService:  APIService) {}

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          firstName: ['', Validators.required]
      });

      // reset login status
      this.apiService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      //const loginuser : LoginUser = { this.f.username.value, this.f.password.value, this.f.firstName.value} as LoginUser;
      this.apiService.login(this.f.username.value, this.f.password.value, this.f.firstName.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate(['/bidding']);
              },
              error => {
                  this.apiService.error(error);
                  this.loading = false;
              });
  }
}
