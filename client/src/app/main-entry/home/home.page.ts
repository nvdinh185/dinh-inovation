import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
          url: '',
          title: 'Hướng dẫn sử dụng chương trình',
          icon: { slot: 'start', color: 'medium', name: 'book' }
        }
        /* ,
        {
          url: 'https://www.ionicframework.com',
          title: 'Liên kết thử',
          icon: { slot: 'start', color: 'medium', name: 'build' }
        }
        ,
        {
          url: 'https://www.ionicframework.com',
          title: 'Hướng dẫn thử',
          icon: { slot: 'start', color: 'medium', name: 'grid' }
        }
        ,
        {
          url: 'https://www.ionicframework.com',
          title: 'Tài liệu thử',
          icon: { slot: 'start', color: 'medium', name: 'color-fill' }
        } */
      ]
    }
  }


  constructor() {}

}
