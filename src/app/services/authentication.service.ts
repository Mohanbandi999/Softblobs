import { Injectable,NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { Auth,authState} from '@angular/fire/auth'
//import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,} from '@angular/fire/auth';
import {from,Observable, switchMap} from 'rxjs'

import { ProfileUser } from 'src/app/models/user-profile';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //currentUser$ = authState(this.auth);
  userData: any;
  constructor( public afs: AngularFirestore,public afAuth: AngularFireAuth,public router: Router, public ngZone: NgZone) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
   }

  
  
  signUp(email:string,password:string){
    return (this.afAuth.createUserWithEmailAndPassword(email, password))
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        // this.SetUserData(result.user);
      // })
      // .catch((error) => {
      //   window.alert(error.message);
      // 
        



    });
  }
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
    }
  SetUserData(user: any) {
    console.log(user)
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      const userData: ProfileUser = {
        uid: user.uid,
        email: user.email
      };
      return userRef.set(userData, {
        merge: true,
      });
    }


    login(email: string, password: string) {
     return  this.afAuth.signInWithEmailAndPassword(email, password)
    }
      

        
  }