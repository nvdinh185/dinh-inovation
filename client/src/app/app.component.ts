import { Component, HostListener } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  // Lấy độ rộng của cửa sổ để quyết định màn hình như nào nhé
  width: number;
  height: number;

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.width = win.innerWidth;
    this.height = win.innerHeight;
  }

  defaultMenu: any = [
    {
      name: 'Trang chủ',
      size: '1.1em',
      type: 'route',     // chuyển trang theo routing
      url: '/home',      // chuyển trang theo routing
      icon: 'home'
    }
    ,
    {
      name: 'Login/Logout',
      type: 'route',     // bấm chuyển trang theo routing
      url: '/login',     // bấm chuyển trang khai phần tử quản lý
      icon: 'log-in'
    }
  ];

  rootPage: any;
  //Khai báo cây menu được tổ chức cho ứng dụng này 

  treeOrigin: any; // cây menu gốc lấy được sau khi login thành công

  //cây này sẽ nhúng vào component treeView để hiển thị menu
  treeMenu: any;

  // Thông tin lưu trữ về thiết bị (tức cài ứng dụng trên thiết bị)
  userDevice: any;

  // Dữ liệu trang chủ đọc từ csdl ứng dụng ra được
  // homeData: any; //cái này không cần lưu ở đây, lấy trực tiếp từ apiAuth.getHomeData() nhé

  //Thông tin người dùng login vào chương trình
  userInfo: any;
  //thông tin token (khóa phiên làm việc của người dùng sau khi login)
  token: any;

  //Cặp khóa riêng của thiết bị sử dụng để mã hóa dữ liệu riêng hoặc ký thông tin riêng
  keyPair: any;

  //Biến khai báo thêm để xác nhận trạng thái trả về của quyền đọc menu sau khi người dùng login
  statusCallBack: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.onResize(); // lấy kích thước màn hình để xem

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // gọi tổ chức menu tùy vào login hay chưa
      this.refresh();

    });
  }

  /**
   * Làm mới menu sau khi login hoặc thay đổi tham số gì đó
   */
  refresh() {

    let sampleMenu = []; // các menu mẫu nếu có
    // Khai báo menu Mặt định
    this.treeMenu = this.defaultMenu;

  }

  /**
   * Sự kiện xãy ra khi người dùng bấm menu có thuộc tính 
   * item.type = 'click'
   * nó sẽ trả về dữ liệu gồm
   * {item:node,index:idx,parent:parent}
   * 
   * @param event 
   */
  onClickItem(event) {
    
    //console.log('emit trả về dữ liệu này', event.item.options);
    this.menuCtrl.close();

    if (event && event.item && event.item.url) {

      if (event.item.options) {

        // chuyên tham số kiểu ActivatedRoute sang event.item.options = { type: 'PARAM',icon:[1,2,3,4,5],it:JSON.stringify({o:'bb'})}
        //this.router.navigate([event.item.url, event.item.options]);

        // Chuyển tham số kiểu queryParams --> { queryParams: { page: pageNum } }
        this.router.navigate([event.item.url], { queryParams: event.item.options });

      } else {

        this.router.navigate([event.item.url]);

      }
    }
  }

  /**
   * Bấm gọi trang login
   */
  onClickLogin(){
    this.menuCtrl.close();
    this.router.navigate(['/login']);
  }

  /**
   * Bam goi user
   */
  onClickUser(){

  }


  /**
   * Thay đổi ảnh đại diện
   */
  onClickUserImage(type: string){

  }
  
}
