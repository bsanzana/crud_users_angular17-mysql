import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  currentUserLogInOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  // En estos 2 ultimos behavior deberian ser un objeto que guardara los datos del usuario, pero no lo logre.
  currentUserAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  currentUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/users/')

      .pipe(catchError(this.errorHandler));
  }

  create(user: User): Observable<any> {
    return this.httpClient
      .post(
        this.apiURL + '/users/create',
        JSON.stringify(user),
        this.httpOptions
      )

      .pipe(catchError(this.errorHandler));
  }

  find(id: any): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/users/' + id)

      .pipe(catchError(this.errorHandler));
  }
  update(id: number, user: User): Observable<any> {
    return this.httpClient
      .put(this.apiURL + '/users/' + id, JSON.stringify(user), this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete(this.apiURL + '/users/' + id, this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  login(email: string): Observable<any> {
    return (
      this.httpClient
        .get(this.apiURL + '/login/' + email)

        //Si no hay error el estado pasa a log on true
        .pipe(
          tap(() => {
            this.currentUserLogInOn.next(true);
          }),
          catchError(this.errorHandler)
        )
    );
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLogInOn.asObservable();
  }

  get userAdmin(): Observable<boolean> {
    return this.currentUserAdmin.asObservable();
  }

  get userId(): Observable<number> {
    return this.currentUserId.asObservable();
  }

  logout(logout: boolean) {
    this.currentUserLogInOn.next(logout);
  }

  typeAdmin(admin: boolean) {
    this.currentUserAdmin.next(admin);
  }

  setUserId(id: number) {
    this.currentUserId.next(id);
  }

  errorHandler(error: any) {
    let errorMessage = '';

    if (error.error) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
