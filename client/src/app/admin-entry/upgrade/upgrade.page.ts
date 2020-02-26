import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'ngxi4-dynamic-service';
import { MainService } from 'src/app/services/main.service';

// thành phần xuất excel từ client
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.page.html',
  styleUrls: ['./upgrade.page.scss'],
})
export class UpgradePage implements OnInit {

  userInfo: any;

  sqlString: string;

  errorMessage: string;

  returnMessage: string;

  returnArray: any;
  returnHeader: any;

  returnArrayViewer: any;
  maxShow: number = 10;   // hiển thị tối đa 10 bảng ghi
  totalCount: number = 0; // Số lượng bảng ghi còn ẩn không view

  constructor(
    private router: Router
    , private apiAuth: AuthService
    , private mainService: MainService
  ) { }

  // vào trang
  ngOnInit() {
    this.userInfo = this.mainService.getUserInfo();
    this.refresh();
    this.init()
  }

  init() {
    
  }


  // làm tươi trang mới
  refresh() {
    if (
      this.userInfo
      && 
      this.userInfo.username !== "cuong.dq"
      &&
      this.userInfo.role !== 99
    ) {
      this.router.navigate(['/']);
    }
  }

  // Hàm gọi trang login
  onClickLogin() {
    this.router.navigate(['/login']);
  }

<<<<<<< HEAD

  // hàm trả kết quả của form nhập sql thực thi lệnh xong
  onSelectedFinish(evt) {
    
    if (evt) {
      if (evt.error && evt.message) {
        this.errorMessage = evt.message
      }
      else {
        this.errorMessage = undefined
      }

      if (evt.response_data && evt.response_data.status === "OK" && evt.response_data.message) {
        this.returnMessage = evt.response_data.message
      }
      else {
        this.returnMessage = undefined
      }

      if (evt.response_data &&  Array.isArray(evt.response_data) && evt.response_data.length>0) {
        this.returnArray = evt.response_data
        let oneRow = this.returnArray[0];
        this.returnHeader = Object.keys(oneRow);
      }
      else {
        this.returnArray = undefined
        this.returnHeader = undefined
      }

    } else { // không trả về gì cả thì quay về home
      this.router.navigate(['/']);
    }
=======
  // gửi lệnh sql lên máy chủ
  onClickSend() {

    this.errorMessage = undefined;
    this.returnMessage = undefined;
    this.returnArray = undefined
    this.returnHeader = undefined

    this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/upgrade-database', { sql: this.sqlString }, true)
      .then(data => {
        if (data && data.status === "OK" && data.message) {
          this.returnMessage = data.message
        }

        if (data && Array.isArray(data) && data.length > 0) {
          this.returnArray = data
          this.totalCount = this.returnArray.length
          this.returnHeader = Object.keys(this.returnArray[0])
          if (this.totalCount > this.maxShow) {
            this.returnArrayViewer = this.returnArray.slice(0, this.maxShow)
          } else {
            this.returnArrayViewer = this.returnArray
          }
        }

      })
      .catch(err => {
        this.errorMessage = err.message
      });
  }

  // hiển thị hết kết quả
  showAll() {
    this.returnArrayViewer = this.returnArray;
  }

  // lệnh xuất excel từ json sẽ cho ra file excel đầy đủ
  exportToExcel(arrResults) {
    let header = Object.keys(arrResults[0])
    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(arrResults, { header });
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'sql-json-to-excel.xlsx');
>>>>>>> cuongdq/angular-export-excel
  }

}
