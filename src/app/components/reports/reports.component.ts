import { Component, OnInit } from '@angular/core';
import { ListItem, Parameters } from '../../models/common';
import { ReportCriteria } from '../../models/reports';
import { AppResponse } from '../../models/response';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public selectedReport: String = null;
  public selectedReportProcessType: String = "http";
  public selectedReportOutputType: String = "pdf";
  
  public reportList: ListItem[] = [];

  constructor(private reportsService: ReportsService) {
    this.selectedReportProcessType = "http";
    this.selectedReportOutputType = "pdf";
  }

  ngOnInit() {
    this.reportsService.getReportList()
      .subscribe((responseData: AppResponse) => {
        console.log("data=" + responseData.data)
        this.reportList = [];
        for(let i = 0; i < responseData.data.length; i++) {
          let item: ListItem = new ListItem()
          item.itemId = responseData.data[i].itemId;
          item.itemLabel = responseData.data[i].itemLabel;
          this.reportList.push(item);
        }
    });

  }

  queryReport() {
    console.log("selectedReport=" + this.selectedReport)

    let reportCriteria: ReportCriteria = new ReportCriteria();
    if(this.selectedReport) {
      reportCriteria.reportCd =  this.selectedReport.toString();
      reportCriteria.reportProcessType = this.selectedReportProcessType.toString();
      reportCriteria.reportOutputType = this.selectedReportOutputType.toString();

      this.getReportKey(reportCriteria);
    }
  }

  goToUrl(externalUrl:string): void {
    console.log("externalUrl=" + externalUrl)
    window.open(externalUrl, "_blank");
  }

  getReportKey(reportCriteria: ReportCriteria) {
      
    this.reportsService.createReportKey(reportCriteria)
      .subscribe((responseData: AppResponse) => {
        console.log("data=" + responseData.data)
        if(reportCriteria.reportProcessType == "http") {
          let reportKey: string = null;
          console.log("responseData.data.key=" + responseData.data.key)
          if (responseData.data && responseData.data.key) {
            reportKey = responseData.data.key;
            let externalUrl:string = this.reportsService.getReportUrlWithKey(reportCriteria, reportKey);
            this.goToUrl(externalUrl)
          }
        } else {
          console.log("Email sent? ... do nothing")
        }

    });
  }

}
