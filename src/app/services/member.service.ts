import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }


  getMember(group_uuid: string, user_uuid: string) {
    return this.http
      .get<AppResponse>("http://127.0.0.1:9001/api/v1.0/public/group/" + group_uuid
                        + "/member/detail/" + user_uuid)
      .pipe(
        catchError(this.handleError)
      );
  }

  getManager(group_uuid: string, user_uuid: string) {
    return this.http
      .get<AppResponse>("http://127.0.0.1:9001/api/v1.0/public/group/" + group_uuid
                        + "/manager/detail/" + user_uuid)
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
