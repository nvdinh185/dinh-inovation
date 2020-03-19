/**
 * Trang này là trang con khi đã chọn được chu kỳ đánh giá
 * Khi họp hội đồng, chu kỳ đánh giá được tạo ra
 * Và nhảy vào trang này để tìm ý tưởng, lọc ý tưởng để đánh giá
 * Join danh sách ý tưởng đủ điều kiện đánh giá kỳ này (trạng thái không phải kết thúc)
 * status_type in (0,1)
 * Sẽ lọc ra danh sách và cho phép tìm kiếm theo id để review
 * Có option lọc theo trạng thái, theo ngày: từ ngày đến ngày
 * 
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonsService, AuthService, DynamicFormMobilePage } from 'ngxi4-dynamic-service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-ideas-review-detail',
  templateUrl: './ideas-review-detail.page.html',
  styleUrls: ['./ideas-review-detail.page.scss'],
})
export class IdeasReviewDetailPage implements OnInit {
  userInfo: any;
  reviewDetail: any;
  isMobile: boolean;
  returnHeader: any;
  parameters: any;
  reviewId: any;
  ajaxReturn: any;

  constructor(private route: ActivatedRoute
    , private apiCommons: CommonsService
    , private apiAuth: AuthService
    , private mainService: MainService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(item => {
      // console.log('item = queryParams = { id : 1}', item);
      // đọc để lấy danh sách ý tưởng mà user đó quan tâm ra
      this.reviewId = item.id;
      this.refresh();
    });
    this.init();
    // this.refresh();
  }


  createHeader() {
    // let returnHeader = Object.keys(this.reviewDetail[0]);
    this.returnHeader = [
      { key: 'title', value: 'Chủ đề' },
      { key: 'description', value: 'Mô tả' },
      { key: 'category_name', value: 'Chủ đề' },
      { key: 'status_name', value: 'Lĩnh vực' },
      { key: 'created_time', value: 'Ngày tạo' },
      { key: 'value_prize', value: 'Giải thưởng' },
    ];
  }

  init() {
    // lấy thông tin user đang login có chưa?
    this.userInfo = this.mainService.getUserInfo();
    this.isMobile = this.apiCommons.isMobile();
  }

  refresh() {
    this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-review-detail?id=' + this.reviewId, true)
      .then(data => {
        this.reviewDetail = data;
        this.createHeader();
        // console.log(this.reviewDetail);
      })
      .catch(err => console.log('Lỗi lấy chi tiết', err));
  }

  // Hiển thị tìm kiếm
  onClickSearch() {
    // TODO:
  }

  async onClickEvaluate(el) {
    // console.log(el);
    
    try {
      this.parameters = await this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea-parameters', true)
    } catch{ }

    let statusOptions = this.parameters && this.parameters.ideas_statuses ? this.parameters.ideas_statuses : [];

    let form: any = {
      title: 'Đánh giá ý tưởng'
      , buttons: [
        { color: 'danger', icon: 'close', next: 'CLOSE' }
      ]
      ,
      items: [
        // Danh sách các trường nhập liệu
        {
          type: "details",
          details: [
            {
              name: "Chủ đề #" + el.id,
              value: el.title
            },
            {
              name: "Tác giả:",
              value: el.fullname
            },
            {
              name: "Lĩnh vực:",
              value: el.category_name
            },
            {
              name: "Trạng Thái:",
              value: el.status_name
            },
          ]
        },
        { type: "hidden", key: "idea_id", value: el.id }
        , { type: "hidden", key: "review_id", value: this.reviewId }
        , { type: "select", key: "idea_status", value: "" + el.status, name: "Chuyển trạng thái", icon: "clock", options: statusOptions, color: "secondary" }
        , { type: "text", key: "value_prize", value: el.value_prize, name: "Nhập giải thưởng?", hint: "Nhập giá trị của giải thưởng (vd: 200k)", input_type: "text", icon: "md-help", validators: [{ required: true }] }
        , { type: "text_area", key: "description", value: el.old_review_result, name: "Nhập nhận xét của hội đồng cho ý tưởng này", input_type: "text", icon: "md-information-circle", validators: [{ required: true, min: 5 }] }
        , {
          type: 'button'
          , options: [
            {
              name: 'Tạo đánh giá ý tưởng'    // button name
              , next: 'CALLBACK'         // callback get resulte or json
              , url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/add-idea-prize', token: true
              , command: 'ADD-PRIZE'          // extra parameter for callback process
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

      // console.log(res);

      if (res.error) {
        //If error 
        this.apiCommons.presentAlert('Error:<br>' + (res.message ? res.message : "Error Unknow: " + JSON.stringify(res.error, null, 2)));
      } else if (res.ajax) {
        // console.log(res);
        // this.dynamicCallback(res.ajax);
        let selectOption = res.ajax.options.find(x => "" + x.value === "" + res.ajax.value);
        let ajaxReturnPrize = {
          key: 'value_prize',
          property_name: 'value',
          new_data: selectOption && selectOption.ajax_default ? selectOption.ajax_default.value_prize : ""
        }
        let ajaxReturnDesc = {
          key: 'description',
          property_name: 'value',
          new_data: selectOption && selectOption.ajax_default ? selectOption.ajax_default.description : ""
        }
        // let testArr = [ajaxReturnPrize, ajaxReturnDesc];
        // console.log(testArr);
        resolve([ajaxReturnPrize, ajaxReturnDesc]);
        return;
      } else if (res.response_data) {
        // Data return when server response or sqlite app respone
        // next="CALLBACK", url="http://..." [,token: true | wzI...]
        if (res.button.command === "ADD-PRIZE") {
          // Do any for command
          this.refresh();

        }
      }

      // close form
      resolve({ next: "CLOSE" });

    });
  }.bind(this);

}
