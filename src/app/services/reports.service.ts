import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AppResponse } from '../models/response';
import { throwError, Observable } from 'rxjs';
import { ReportCriteria } from '../models/reports';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {


  // /api/v1.0/public/report/list
  constructor(private http: HttpClient) { }


  getReportList() {  // ListItem
    return this.http
      .get<AppResponse>("http://127.0.0.1:9002/api/v1.0/public/reports/list")
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }

   createReportKey(reportCriteria: ReportCriteria) {
    let params:HttpParams = reportCriteria.serializeToHttpParams();

    return this.http
      .post<AppResponse>("http://127.0.0.1:9002/api/v1.0/public/reports/create", reportCriteria)
      .pipe(
        catchError(this.handleError)
      );

    // $log.debug('runReport');
    // //$log.debug(reportParams);

    // var resource = $resource('http://127.0.0.1:9002/api/v1.0/public/create');
    // return resource.save(reportParams).$promise;
  }

  getReportKey(reportCriteria: ReportCriteria) {
      
    this.createReportKey(reportCriteria)
      .subscribe((responseData: AppResponse) => {
        console.log("data=" + responseData.data)
        let reportKey: string = null;
        if (responseData.data && responseData.data.key) {
          reportKey = responseData.data.key;
        }

    });
  }

  getReportUrlWithKey(reportCriteria: ReportCriteria, key: string) {
    let params:HttpParams = reportCriteria.serializeToHttpParams();
    console.log("params.toString()=" + params.toString());

    return "http://127.0.0.1:9002/api/v1.0/reports/download/" + key + "?" + params.toString();
  }

  getReportUrlWithKey2(reportParams: string[][], key: string) {
    let params:HttpParams = new HttpParams()

    for(let i = 0; i < reportParams.length; i++) {
      let k :string = reportParams[i][0];
      let v :string = reportParams[i][1];

      params.set(k, v);
    }

    return this.http
      .get<AppResponse>("http://127.0.0.1:9002/api/v1.0/reports/download/" + key, {params})
      .pipe(
        catchError(this.handleError)
      );
  }

//   function getReportUrlWithKey(reportParams, key) {
//     $log.debug('downloadReportWithKey');

// var qs = $httpParamSerializer(reportParams);
// return ENV.restApiEndPoint + '/admin/reports/create/' + key + "?" + qs;
// }	
}
