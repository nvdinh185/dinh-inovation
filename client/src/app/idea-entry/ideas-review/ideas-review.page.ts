/**
 * Chức năng này tương ứng với cơ sở dữ liệu v7
 * Bổ sung 2 bảng thông tin ideas_reviews và ideas_prizes
 * Chức năng này chỉ phân quyền cho user có role = 2,3,98,99
 */
import { Component, OnInit } from '@angular/core';
import { CommonsService, AuthService, DynamicFormMobilePage } from 'ngxi4-dynamic-service';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ideas-review',
  templateUrl: './ideas-review.page.html',
  styleUrls: ['./ideas-review.page.scss'],
})
export class IdeasReviewPage implements OnInit {

  userInfo: any;

  isMobile: boolean;

  reviewList: any;

  constructor(
    private router: Router
    , private apiCommons: CommonsService
    , private apiAuth: AuthService
    , private mainService: MainService
  ) { }

  ngOnInit() {
    this.init();
    this.refresh();
  }

  init() {
    // lấy thông tin user đang login có chưa?
    this.userInfo = this.mainService.getUserInfo();
    // màn hình có độ rộng < 576px
    this.isMobile = this.apiCommons.isMobile();
  }

  refresh() {
    this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-reviews', true)
      .then(data => {
        this.reviewList = data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  onClickEvaluate(rev) {
    this.router.navigate(['/ideas-review-detail'], { queryParams: { id: rev.id } });
  }

  onClickEdit(rev) {
    let form: any = {
      title: 'Sửa thông tin kỳ họp'
      , buttons: [
        { color: 'danger', icon: 'close', next: 'CLOSE' }
      ]
      ,
      items: [
        // Danh sách các trường nhập liệu
        { type: "hidden", key: "id", value: rev.id }
        , { type: "text", key: "name", value: rev.name, name: "Tên kỳ họp", hint: "Nhập tên kỳ họp (5-200 ký tự)", input_type: "text", icon: "md-help", validators: [{ required: true, min: 5, max: 200 }] }
        , { type: "text_area", key: "description", value: rev.description, name: "Mô tả đợt đánh giá: thành phần, hội đồng? Gõ nội dung nhận xét của hội đồng", input_type: "text", icon: "md-information-circle", validators: [{ required: true, min: 10 }] }
        , {
          type: "upload-files", name: "Thêm file đính kèm"
          , multiple: "multiple"
          , accept: `image/gif, image/jpeg, image/png
                , application/pdf
                , .txt, .md, .zip, .tar
                , .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel
                , application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document`}
        , {
          type: 'button'
          , options: [
            {
              name: 'Sửa kỳ họp'    // button name
              , next: 'CALLBACK'         // callback get resulte or json
              , url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/add-review', type: "FORM-DATA", token: true
              , command: 'EDIT-REVIEW'          // extra parameter for callback process
            }
          ]
        }
      ]
    }
    // call popup window for form login
    this.apiCommons.openModal(DynamicFormMobilePage,
      {
        parent: this,  // for dismiss child component
        callback: this.callbackProcess, //function for callback process result of form
        form: form    // form dynamic 
      }
    );
  }

  /**
   * Tạo một kỳ họp hội đồng
   * 
   */
  onClickAdd() {
    let form: any = {
      title: 'Tạo một kỳ họp mới'
      , buttons: [
        { color: 'danger', icon: 'close', next: 'CLOSE' }
      ]
      ,
      items: [
        // Danh sách các trường nhập liệu
        { type: "text", key: "name", value: "", name: "Nhập tên của kỳ họp? ", hint: "Nhập tên kỳ họp (5-200 ký tự)", input_type: "text", icon: "md-help", validators: [{ required: true, min: 5, max: 200 }] }
        , { type: "text_area", key: "description", value: "", name: "Mô tả đợt đánh giá: thành phần, hội đồng? Gõ nội dung nhận xét của hội đồng", input_type: "text", icon: "md-information-circle", validators: [{ required: true, min: 10 }] }
        , {
          type: "upload-files", name: "Files đính kèm"
          , multiple: "multiple"
          , accept: `image/gif, image/jpeg, image/png
                , application/pdf
                , .txt, .md, .zip, .tar
                , .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel
                , application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document`}
        , {
          type: 'button'
          , options: [
            {
              name: 'Tạo mới kỳ họp'    // button name
              , next: 'CALLBACK'         // callback get resulte or json
              , url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/add-review', type: "FORM-DATA", token: true
              , command: 'ADD-REVIEW'          // extra parameter for callback process
            }
          ]
        }
      ]
    }
    // call popup window for form login
    this.apiCommons.openModal(DynamicFormMobilePage,
      {
        parent: this,  // for dismiss child component
        callback: this.callbackProcess, //function for callback process result of form
        form: form    // form dynamic 
      }
    );

  }

  // hàm gọi lại xử lý form popup
  callbackProcess = function (res) {
    // allway return Promise for callback
    return new Promise<any>((resolve, reject) => {

      console.log(res);

      if (res.error) {
        //If error 
        this.apiCommons.presentAlert('Error:<br>' + (res.message ? res.message : "Error Unknow: " + JSON.stringify(res.error, null, 2)));

      } else if (res.response_data) {
        // Data return when server response or sqlite app respone
        // next="CALLBACK", url="http://..." [,token: true | wzI...]
        if (res.button.command === "ADD-REVIEW") {
          // Do any for command
          this.refresh();

        }
        if (res.button.command === "EDIT-REVIEW") {
          // Do any for command
          this.refresh();
        }

      }

      // close form
      resolve({ next: "CLOSE" });

    });
  }.bind(this);
}
