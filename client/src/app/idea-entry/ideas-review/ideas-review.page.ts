/**
 * Chức năng này tương ứng với cơ sở dữ liệu v7
 * Bổ sung 2 bảng thông tin ideas_reviews và ideas_prizes
 * Chức năng này chỉ phân quyền cho user có role = 2,3,98,99
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ideas-review',
  templateUrl: './ideas-review.page.html',
  styleUrls: ['./ideas-review.page.scss'],
})
export class IdeasReviewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
   * Tạo một kỳ họp hội đồng
   * 
   */
  onClickAdd(){

  }
}
