import { Injectable } from '@angular/core';
import {EndpointService} from './endpoint.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserType} from '../../types/response/user-type';
import {catchError, mergeMap} from 'rxjs/operators';
import {TypeBuilder} from '../../util/type-builder';
import {PaginateType} from '../../types/paginate-type';

@Injectable()
export class UserEndpointService extends EndpointService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public paginate(page: number = 1): Observable<PaginateType<UserType>> {
    const url = `${this.apiUrl}/admin/all?page=${page}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)),
        mergeMap(value => TypeBuilder.paginate(value.users, TypeBuilder.users)));
  }
}
