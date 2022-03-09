import { Component, OnInit} from '@angular/core';
import {  
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import {UserService} from 'src/app/services/user.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ProfileUser } from 'src/app/models/user-profile';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    uid: new FormControl(''),
    diplayName:new FormControl('',Validators.required),
    email:new FormControl('', [Validators.email,Validators.required]),
    password: new FormControl('', Validators.required)
  })
  
  constructor(private authService: AuthenticationService,private toast: HotToastService, private router: Router,
    private userService: UserService,public afs: AngularFirestore,
    public afAuth: AngularFireAuth) { }

  ngOnInit(): void {}

  get name(){
    return this.signUpForm.get('name');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  submit(){
   // if (!this.signUpForm.valid) {
    //  return
    //}

    
     const{uid,name,email, password}=this.signUpForm.value;
    // this.authService.signUp(email,password).pipe(
    //   switchMap(({user:{uid}})=>this.usersService.addUser({uid,email,displayName:name})),
    //   this.toast.observe({
    //     success:'Congrats ! you are signed up',
    //     loading:'sigining in',
    //     error:({message})=> '${message}'
    //   })
    //   ).subscribe(() => {
    //     this.router.navigate(['/dashboard']);
    //   })
     this.authService.signUp(email,password)
     .then((data:any)=>{
      console.log(data.user.email)
      this.afs.collection('users').doc(data.user.uid).set({
        'uid':data.user.uid,
        'email':data.user.email
        })
        
       
      }
     )
    }
  }
    
   
