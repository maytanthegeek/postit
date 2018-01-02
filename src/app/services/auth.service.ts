import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
    private user : Observable < firebase.User >;
    public userDetails : firebase.User;

    constructor(private _firebaseAuth : AngularFireAuth, private router : Router) {
        this.user = _firebaseAuth.authState;
        this.user.subscribe(
            (user) => {
                if (user) {
                    this.userDetails = user;
                    console.log(this.userDetails);
                } else {
                    this.userDetails = null;
                }
            });
    }

    loginWithGoogle() {
        return this
            ._firebaseAuth
            .auth
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    }

    loginWithEmail() {
        return this
            ._firebaseAuth
            .auth
            .signInWithPopup(new firebase.auth.EmailAuthProvider())
    }

    isLoggedIn() {
        if (this.userDetails == null) {
            return false;
        } else {
            return true;
        }
    }

    logout() {
        this._firebaseAuth.auth.signOut()
            .then((res) => this.router.navigate(['/']));
    }
}