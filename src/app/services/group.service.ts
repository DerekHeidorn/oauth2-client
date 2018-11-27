import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http
      .get<AppResponse>("http://127.0.0.1:9001/api/v1.0/public/group")
      .pipe(
        catchError(this.handleError)
      );
  }

  getGroup(uuid: string) {
    return this.http
      .get<AppResponse>("http://127.0.0.1:9001/api/v1.0/public/group/detail/" + uuid)
      .pipe(
        catchError(this.handleError)
      );
  }



  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }

}
