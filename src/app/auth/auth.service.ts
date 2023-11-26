import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, map, switchMap,tap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get isAuthenticated$(): Observable<boolean> {
    return this._authSub$.asObservable();
  }

  constructor(
    private _router: Router,
    private _afAuth: AngularFireAuth,
    private _afs: AngularFirestore
    ) {
    this._afAuth.authState.subscribe(user => this._authSub$.next(!!user));
  }

  public login(email: string, password: string): Observable<void> {
    return from(this._afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(() => this.checkPaymentStatus())
    );
  }

  public logout(redirect: string): Observable<void> {
    return from(this._afAuth.signOut()).pipe(
      tap(() => {
        this._authSub$.next(false);
        this._router.navigate([redirect]);
      }),
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Unable to sign out'));
      })
    );
  }
  private checkPaymentStatus(): Observable<void> {
    return this._afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const email = user.email ;
          return this._afs.collection('Users').doc(email?.toString()).valueChanges();
        } else {
          return throwError(() => new Error('User not found'));
        }
      }),
      map((userData: any) => {
          if (userData.status == true) {
            // Jika pembayaran lunas, lanjutkan
            this._authSub$.next(true);
          } else {
            this._authSub$.next(false);
            // Jika pembayaran belum lunas, kembalikan error
            throw new Error('Payment not completed');
          }
      })
    );
  }
}
