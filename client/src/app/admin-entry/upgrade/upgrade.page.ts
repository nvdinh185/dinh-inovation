import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'ngxi4-dynamic-service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.page.html',
  styleUrls: ['./upgrade.page.scss'],
})
export class UpgradePage implements OnInit {

  userInfo: any;

  dynamicFormInput: string;
  dynamicFormValue: string;
  dynamicCallback: any;


  errorMessage: string;

  returnMessage: string;

  returnArray: any;
  returnHeader: any;

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
    // form nhập liệu này
    this.dynamicFormInput = JSON.stringify({ // Form mẫu hiển thị nhập liệu tạo đối tượng jon_data
      okButton: { icon: "cube", name: "Nâng cấp CSDL", color: "danger", next: "CALLBACK", command: "RUN-SQL", url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/upgrade-database', token: true }
      ,
      cancelButton: { icon: "close", next: "CLOSE" }
      ,
      items: [
        // Danh sách các trường nhập liệu
        { type: "text_area", key: "sql", name: "Gõ câu lệnh sql đúng csdl đang hoạt động", hint: "Nhập lệnh sql", input_type: "text", icon: "md-information-circle", validators: [{ required: true }] }
      ]
    })
  }


  // làm tươi trang mới
  refresh() {
    if (
      this.userInfo.username !== "cuong.dq"
      &&
      this.userInfo.role !== 99
    ) {
      this.router.navigate(['/']);
    }
  }


  // Hàm gọi trang login
  onClickLogin(){
    this.router.navigate(['/login']);
  }


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
  }

}
