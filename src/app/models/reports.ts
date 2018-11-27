import { HttpParams} from '@angular/common/http';

export class ReportCriteria {
    reportCd: string;
    reportProcessType: string = "Http";
    reportOutputType: string = "pdf";

    public serializeToHttpParams(): HttpParams {
        let params:HttpParams = new HttpParams()

        if(this.reportCd) {
            params = params.append("reportCd", this.reportCd);
        }
        if(this.reportCd) {
            params = params.append("reportProcessType", this.reportProcessType);
        }
        if(this.reportCd) {
            params = params.append("reportOutputType", this.reportOutputType);
        }
        return params;
      }
  }