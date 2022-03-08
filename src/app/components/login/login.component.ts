import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any=new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })
  constructor(private authService: AuthenticationService,private toast: HotToastService, private router: Router) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
    }
  }



    // if (!this.loginForm.valid) {
    //   return;
    // }
    
    // console.log(this.email.email)
    // if(this.email =='Admin@email.com'){
    //    const { email, password } = this.loginForm.value;
    //  this.authService.login(email, password).pipe(
    //    this.toast.observe({
    //      success: 'Logged in successfully',
    //      loading: 'Logging in...',
    //      error: ({ message }) => `There was an error: ${message} `
    //    })
    //  ).subscribe(() => {
    //    this.router.navigate(['/dashboard']);
    //  });
    //  }
    //else{
  // // //   login(email: string, password: string) {
  // // //   this.afAuth.auth.signInWithEmailAndPassword(email, password)
  // // //   .then(value => {
  // // //     console.log('Nice, it worked!');
  // // //     this.router.navigateByUrl('/profile');
  // // //   })
  // // //   .catch(err => {
  // // //     console.log('Something went wrong: ', err.message);
  // // //   });
  // // // }
    
  }



