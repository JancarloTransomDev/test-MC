import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoginRequest} from '../types/request/login-request';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {TypeBuilder} from '../util/type-builder';
import {LoginResultType} from '../types/login-result-type';
import {AuthorizationBearerType} from '../types/response/authorization-bearer-type';
import {UserType} from '../types/response/user-type';
import {Router} from '@angular/router';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class AuthService {

  private loginUrl = `${environment.apiUrl}/auth/login`;
  private logoutUrl = `${environment.apiUrl}/auth/logout`;
  private meUrl = `${environment.apiUrl}/auth/me`;

  private _accessToken: string | null;
  private _refreshToken: string | null;
  private _user: UserType | null;

  private accessToken$: ReplaySubject<string | null> = new ReplaySubject<string | null>(1);
  private refreshToken$: ReplaySubject<string | null> = new ReplaySubject<string | null>(1);
  private user$: ReplaySubject<UserType | null> = new ReplaySubject<UserType | null>(1);

  constructor(private httpClient: HttpClient,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  public startup(): void {
    this.localStorageService.loadData().then(() => {
      const accessToken = this.localStorageService.accessToken;
      const refreshToken = this.localStorageService.refreshToken;
      this.setAccessToken(accessToken);
      this.setRefreshToken(refreshToken);
      this.getUserMe(accessToken).subscribe(user => {
        this.setUser(user);
      });
    });
  }

  public setAccessToken(value: string | null): void {
    this._accessToken = value;
    this.accessToken$.next(this._accessToken);
  }

  public getAccessToken(): string | null {
    return this._accessToken;
  }

  public get accessToken(): Observable<string | null> {
    return this.accessToken$.asObservable();
  }

  public setRefreshToken(value: string | null): void {
    this._refreshToken = value;
    this.refreshToken$.next(this._refreshToken);
  }

  public getRefreshToken(): string | null {
    return this._refreshToken;
  }

  public get refreshToken(): Observable<string | null> {
    return this.refreshToken$.asObservable();
  }

  public setUser(user: UserType | null): void {
    this._user = user;
    this.user$.next(this._user);
  }

  public getUser(): UserType | null {
    return this._user;
  }

  public get user(): Observable<UserType | null> {
    return this.user$.asObservable();
  }

  public login(payrollNumber: string, password: string): Observable<LoginResultType> {
    const form: LoginRequest = {
      payroll_number: payrollNumber,
      password
    };
    return this.httpClient.post<any>(this.loginUrl, form).pipe(
      map(response => {
        TypeBuilder.authorizationBearer(response).then(authorizationBearer => {
          this.handleSuccessLogin(authorizationBearer);
        });
        const result: LoginResultType = {
          status: 'success',
          message: 'Logged Successfully'
        };
        return result;
      }), catchError((err: HttpErrorResponse) => this.handleLoginErrorMessage(err)));
  }

  public logout(): void {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this._accessToken}`
    });
    this.httpClient.get<any>(this.logoutUrl, {headers}).subscribe(value => {
    });
    this.localStorageService.setAccessToken(null);
    this.localStorageService.setRefreshToken(null);
    this.setAccessToken(null);
    this.setRefreshToken(null);
    this.setUser(null);
    this.goToLoginPage();
  }

  public handleSuccessLogin(authorizationBearer: AuthorizationBearerType): void {
    this.setAccessToken(authorizationBearer.accessToken);
    this.setRefreshToken(authorizationBearer.refreshToken);
    this.localStorageService.setAccessToken(authorizationBearer.accessToken);
    this.localStorageService.setRefreshToken(authorizationBearer.refreshToken);
    this.getUserMe(authorizationBearer.accessToken).subscribe(user => {
      if (user) {
        this.setUser(user);
        this.goToLoggedHomePage();
      } else {
        // AN error occurss
      }
    });
  }

  public goToLoggedHomePage(): void {
    this.router.navigate(['/admin'], { replaceUrl: true });
  }

  public goToLoginPage(): void {
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }

  private getUserMe(bearerToken: string): Observable<UserType | null> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`
    });
    return this.httpClient.get<any>(this.meUrl, {headers}).pipe<UserType | null, any>(catchError((err: HttpErrorResponse) => of(null)),
      mergeMap(response => TypeBuilder.user(response)));
  }

  private handleLoginErrorMessage(error: HttpErrorResponse): Observable<LoginResultType> {
    const result: LoginResultType = {
      status: 'error',
      message: ''
    };
    switch (error.status) {
      case 401 || 403:
        result.status = 'invalid_credentials';
        result.message = 'Invalid Credentials';
        break;
      default:
        result.status = 'error';
        result.message = 'An error occurred, try again latter';
        break;
    }
    if (error.error) {
      result.message = error.error.message ?? result.message;
    }
    return of(result);
  }
}
