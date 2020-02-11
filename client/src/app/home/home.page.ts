import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  homeForm: any = {
    title: 'Home',
    card: {
      image: '/assets/imgs/icon.png',
      title: 'Chương trình quản lý ý tưởng',
      subtitle: 'M.INOVATION',
      content: `Chương trình hỗ trợ quản lý ý tưởng.`
    }
    ,
    list: {
      title: 'Tài liệu (nếu có)'
      ,
      items: [
        {
          url: '',
          title: 'Hướng dẫn sử dụng chương trình',
          icon: { slot: 'start', color: 'medium', name: 'book' }
        }
        ,
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
        }
      ]
    }
  }


  constructor() {}

}
