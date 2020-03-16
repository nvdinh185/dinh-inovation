/**
 * Chức năng này tương ứng với cơ sở dữ liệu v7
 * Bổ sung 2 bảng thông tin ideas_reviews và ideas_prizes
 * Chức năng này chỉ phân quyền cho user có role = 2,3,98,99
 */
import { Component, OnInit } from '@angular/core';
import { CommonsService, AuthService } from 'ngxi4-dynamic-service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-ideas-review',
  templateUrl: './ideas-review.page.html',
  styleUrls: ['./ideas-review.page.scss'],
})
export class IdeasReviewPage implements OnInit {

  userInfo: any;

  isMobile: boolean;
  
  constructor(
    private apiCommons: CommonsService
    , private apiAuth: AuthService
    , private mainService: MainService
  ) { }

  ngOnInit() {
    this.init();
  }


  init() {
    // lấy thông tin user đang login có chưa?
    this.userInfo = this.mainService.getUserInfo();
    this.isMobile = this.apiCommons.isMobile();
  }

  /**
   * Tạo một kỳ họp hội đồng
   * 
   */
  onClickAdd(){

  }
}
