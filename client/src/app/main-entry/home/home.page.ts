import { Component, OnInit } from '@angular/core';
import { AuthService } from 'ngxi4-dynamic-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  homeForm: any = {
    title: 'Văn phòng sáng tạo',
    card: {
      image: 'assets/imgs/background-idea.jpg',
      title: 'Văn phòng sáng tạo cho mọi người',
      subtitle: 'M.INOVATION',
      content: `Chương trình hỗ trợ sáng tạo và quản lý ý tưởng.`
    }
    ,
    list: {
      title: 'Tài liệu:'
      ,
      items: [
        {
          url: 'assets/docs/manual_v1.pdf',
          title: 'Hướng dẫn sử dụng chương trình',
          icon: { slot: 'start', color: 'medium', name: 'book' }
        }
      ]
    }
  }

  topUsersActions: any;

  constructor(
    private apiAuth: AuthService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-top-actions")
      .then(data => {
        // console.log('Data: ', data);
        this.topUsersActions = data;
        // console.log(this.topUsersActions);
      })
      .catch(err => {
        // console.log('Lỗi: ', err);
      });
  }

}
