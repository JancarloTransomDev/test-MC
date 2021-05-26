import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from "rxjs";

@Injectable()
export class EndpointService {
  protected baseUrl = environment.baseUrl;
  protected apiUrl = environment.apiUrl;

  constructor(protected httpClient: HttpClient) {
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        // this.authService.redirectToLogin();
        break;
      case 403:
        // this.authService.unauthorizedMessage();
        break;
    }
    throw throwError(error);
  }
}
