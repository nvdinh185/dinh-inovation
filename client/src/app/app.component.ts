import { Component } from '@angular/core';

import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService, CommonsService } from 'ngxi4-dynamic-service';
import { MainService } from './services/main.service';

import { environment } from './../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // menu chưa login
  defaultMenu: any = [
    {
      id: 1,
      name: 'Văn phòng sáng tạo',
      size: '1.1em',
      type: 'route',     // chuyển trang theo routing
      url: '/home',      // chuyển trang theo routing
      icon: 'home'
    }
    ,
    {
      id: 2,
      name: 'Login/Logout',
      type: 'route',     // bấm chuyển trang theo routing
      url: '/login',     // bấm chuyển trang khai phần tử quản lý
      icon: 'log-in'
    }
  ];

  //cây này sẽ nhúng vào component tree-menu để hiển thị menu
  treeMenu: any = [];

  //Thông tin người dùng login vào chương trình
  userInfo: any;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private apiAuth: AuthService,
    private apiCommons: CommonsService,
    private mainService: MainService
  ) { this.initializeApp(); }

  initializeApp() {
    this.init();
  }

  /**
   * Khởi tạo các biến đầu tiên
   */
  init() {
    this.apiAuth.serviceUrls.AUTH_SERVER = environment.AUTH_SERVER || 'http://localhost:9223/m-inovation/api/auth';
    this.apiAuth.serviceUrls.RESOURCE_SERVER = environment.RESOURCE_SERVER || 'http://localhost:9223/m-inovation/api';
    this.apiAuth.serviceUrls.MEDIA_SERVER = environment.MEDIA_SERVER || 'http://localhost:9223/m-inovation/nlp';
    this.apiAuth.serviceUrls.SOCKET_SERVER = environment.SOCKET_SERVER || 'http://localhost:9223/m-inovation/chatbot';

    this.apiCommons.subscribe('event-login-ok', (userInfo) => {
      this.userInfo = userInfo
      // gọi tổ chức menu khi login thành công
      this.refresh();
    })

    this.apiCommons.subscribe('event-logout-ok', () => {
      this.userInfo = null
      // Gán lại menu mặc định
      this.treeMenu = this.defaultMenu;
    })

    this.mainService.getTokenInfo()
      .then(userInfo => {
        this.userInfo = userInfo;
        // console.log(this.userInfo);
        this.refresh();
      })
      .catch(err => {
        this.refresh();
      })

  }

  /**
   * Làm mới menu sau khi load hoặc login
   */
  refresh() {
    // Khai báo menu Mặc định
    this.treeMenu = [
      {
        id: 1,
        name: 'Văn phòng sáng tạo',
        size: '1.1em',
        type: 'route',     // chuyển trang theo routing
        url: '/home',      // chuyển trang theo routing
        icon: 'home'
      }
      ,
      {
        id: 2,
        name: 'Login/Logout',
        type: 'route',     // bấm chuyển trang theo routing
        url: '/login',     // bấm chuyển trang khai phần tử quản lý
        icon: 'log-in'
      }
    ];

    if (this.userInfo) {
      // thêm menu phòng ý tưởng
      this.treeMenu.push(
        {
          id: 3,
          name: 'Phòng ý tưởng',
          size: '1.1em',
          type: 'route',     // chuyển trang theo routing
          url: '/idea',      // chuyển trang theo routing
          icon: 'md-alarm'
        })
    }

  }

  /**
   * Bấm gọi trang login
   */
  onClickLogin() {
    this.menuCtrl.close();
    this.router.navigate(['/login']);
  }

}
