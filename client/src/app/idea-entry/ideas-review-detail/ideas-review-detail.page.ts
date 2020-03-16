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

@Component({
  selector: 'app-ideas-review-detail',
  templateUrl: './ideas-review-detail.page.html',
  styleUrls: ['./ideas-review-detail.page.scss'],
})
export class IdeasReviewDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // tìm kiếm ý tưởng
  // bấm nút tìm kiếm để ra
  onClickSearch(){

  }
}
