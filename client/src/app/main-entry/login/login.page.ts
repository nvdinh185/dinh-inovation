import { Component, OnInit } from '@angular/core';
import { AuthService, CommonsService, DynamicFormMobilePage, Ionic4CroppieComponent, ImageService, CameraCardComponent } from 'ngxi4-dynamic-service';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: any = {
    title: `Login`
  }

  userInfo: any;

  constructor(
    private apiCommons: CommonsService
    , private apiAuth: AuthService
    , private mainService: MainService
    , private apiImage: ImageService
  ) { }

  ngOnInit() {
    this.mainService.getTokenInfo()
      .then(userInfo => {
        if (userInfo) {
          this.userInfo = userInfo;
          this.showUserInfo();
        }
      })
      .catch(err => {
        this.showUserInfo();
      })
  }

  /**
   * xử lý nút bấm
   * @param btn 
   */
  onClick(btn) {

    // lệnh login
    if (btn.command === 'LOGIN') {
      this.login()
    }

    // lệnh logout
    if (btn.command === 'LOGOUT') {
      this.mainService.logout()
      this.userInfo = null
      this.showUserInfo();
    }

    // sửa thông tin user
    if (btn.command === 'EDIT' && this.userInfo) {
      this.editUser();
    }


  }

  /**
   * xử lý upload ảnh mới
   * @param evt 
   */
  imageUploadEvent(evt, item) {
    if (!evt.target) { return; }
    if (!evt.target.files) { return; }
    if (evt.target.files.length !== 1) { return; }
    const file = evt.target.files[0];
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') { return; }

    //gán sự kiện chọn ảnh
    //this.imageChangedEvent = evt;

    //gán sự kiện chọn ảnh crop
    // = evt;
    this.apiCommons.openModal(Ionic4CroppieComponent, {
      parent: this, // để gọi cắt
      item: item,
      event: evt,
      options: item.options
    })
      .then(data => {
        item.value = data ? data : item.value;
      })
  }

  /**
   * xử lý cắt ảnh
   * @param item 
   */
  async cropImage(item) {
    let imageBase64 = await this.apiImage.createBase64Image(item.value, 600);

    this.apiCommons.openModal(Ionic4CroppieComponent, {
      parent: this, // để gọi cắt
      item: item,
      // nếu giá trị là url thì chuyển thành base64 để crop
      // giảm kích thước xuống còn 600x600 là tối đa nhé
      image: imageBase64,
      options: item.options
    })
      .then(data => {
        item.value = data ? data : item.value;
      })
  }


  /** mở webcam trên máy */
  openCamera(item) {
    this.apiCommons.openModal(CameraCardComponent, {
      parent: this, // để gọi tắt cửa sổ
    })
      .then(data => {
        // console.log('ảnh nhận được: ', data ? data.length : undefined);
        item.value = data ? data : item.value;
      })
  }

  /**
   * Hiển thị ảnh thật
   * @param item 
   */
  showImage(item) {
    item.visible = !item.visible;
  }

  /**
   * Gọi chức năng login
   */
  login() {

    let form = {
      title: 'Login'
      , buttons: [
        { color: 'danger', icon: 'close', next: 'CLOSE' }
      ]

      , items: [
        { type: 'title', name: 'Nhập user của email @mobifone.vn' }
        ,
        // form login gồm nhập số điện thoại username và pass
        {
          type: 'text'              // input text
          , key: 'username'         // json_key + value input ==> {username:value}
          , value: ''               // default value
          , name: 'Tên đăng nhập:'
          , hint: 'Sử dụng user của email'
          , input_type: 'userName'          // input type as ionic
          , icon: 'ios-contact'      // icon of ionic list
          , validators: [{ required: true, min: 3, max: 30, validators: [{ pattern: "^[a-z0-9._%+-]" }] }]
        }
        , { type: "password", key: "password", name: "password", hint: "Mật khẩu phải có chữ hoa, chữ thường, ký tự đặc biệt, số", input_type: "password", icon: "md-key", validators: [{ required: true, min: 3, max: 20 }] }
        ,
        {
          type: 'button'
          , options: [
            {
              name: 'Đăng nhập'        // button name
              , next: 'CALLBACK'       // callback get resulte or json
              , url: this.apiAuth.serviceUrls.AUTH_SERVER + '/login'
              , token: true         // token login before interceptor or token string
              , command: 'LOGIN'    // extra parameter for callback process
            }
          ]
        }
      ]
    }

    // call popup window for form login
    this.apiCommons.openModal(DynamicFormMobilePage,
      {
        parent: this,                 // for dismiss child component
        callback: this.callbackLogin, // function for callback process result of form
        form: form                    // form dynamic 
      }
    );

  }



  /**
   * 5. Hiển thị thông tin sau khi đăng nhập thành công
   *  hiển thị dữ liệu cho chính form login này
   */
  showUserInfo() {

    if (this.userInfo)
      this.formLogin = {
        title: "ĐÃ ĐĂNG NHẬP"
        , color: 'primary'
        , items: [
          /* {
            type: 'qrcode',
            value: token
          }
          , */
          {
            type: 'barcode',
            value: this.userInfo.username
          }
          ,
          {
            type: "details",
            details: [
              {
                name: "Username(*)",
                value: this.userInfo.username
              },
              {
                name: "Họ và tên(*)",
                value: this.userInfo.fullname
              },
              {
                name: "Nickname(*)",
                value: this.userInfo.nickname
              },
              {
                name: "Địa chỉ(*)",
                value: this.userInfo.address
              },
              {
                name: "Điện thoại(*)",
                value: this.userInfo.phone
              },
              {
                name: "Email(*)",
                value: this.userInfo.email
              }
            ]
          },
          { id: "avatar", type: "image-viewer", name: "ẢNH ĐẠI DIỆN", value: this.userInfo.avatar ? this.userInfo.avatar : "assets/imgs/avatar.jpg" }
          ,
          { id: "background", type: "image-viewer", name: "ẢNH NỀN", value: this.userInfo.background ? this.userInfo.background : "assets/imgs/background-idea.jpg" }
          ,
          {
            type: "button"
            , options: [
              { name: "Sửa (*)", command: "EDIT" }
              , { name: "Logout", command: "LOGOUT" }
            ]
          }
        ]
      }
    else
      this.formLogin = {
        title: "LOGIN"
        , color: 'primary'
        , items: [
          {
            type: "button"
            , options: [
              { name: "Đăng nhập", command: "LOGIN" }
            ]
          }
        ]
      }
  }

  /**
   * Lưu trữ token và userInfo
   * @param token 
   * @param userInfo 
   */
  saveToken(token, userInfo) {
    // console.log(token, userInfo);
    this.userInfo = userInfo;
    this.mainService.saveToken(token, userInfo);
    this.showUserInfo();
  }

  /**
   * Sửa thông tin cá nhân
   */
  editUser() {
    let form = {
      title: "SỬA THÔNG TIN CÁ NHÂN"
      , buttons: [
        { color: 'danger', icon: 'close', next: 'CLOSE' }
      ]
      , items: [
        { name: "Cập nhập các thông tin sau", type: "title" }
        , { key: "nickname", value: this.userInfo.nickname, name: "Biệt danh", hint: "Nickname", type: "text", input_type: "text", icon: "heart", validators: [{ required: true, min: 1 }] }
        , { key: "fullname", value: this.userInfo.fullname, name: "Họ và tên", hint: "Họ và tên đầy đủ", type: "text", input_type: "text", icon: "person", validators: [{ required: true, min: 5 }] }
        , { key: "address", value: this.userInfo.address, name: "Địa chỉ", hint: "Địa chỉ đầy đủ", type: "text", input_type: "text", icon: "pin", validators: [{ required: true, min: 5 }] }
        , { key: "phone", value: this.userInfo.phone, name: "Điện thoại liên hệ", hint: "Yêu cầu định dạng số điện thoại nhé", type: "text", input_type: "tel", icon: "call", validators: [{ pattern: "^[0-9]*$" }] }
        , { key: "email", value: this.userInfo.email, name: "email", hint: "Yêu cầu định dạng email nhé", type: "text", input_type: "email", icon: "mail", validators: [{ pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }] }
        , { key: "avatar", type: "image", name: "ẢNH ĐẠI DIỆN", value: this.userInfo.avatar ? this.userInfo.avatar : "assets/imgs/avatar.jpg", options: {ratio: 1/1, max_width:80} }
        , { key: "background", type: "image", name: "ẢNH NỀN", value: this.userInfo.background ? this.userInfo.background : "assets/imgs/background-idea.jpg", options: {ratio: 16/9, max_width:300}  }
        , {
          type: "button"
          , options: [
            { name: "Bỏ qua", next: "CLOSE" }
            ,
            { name: "Cập nhập", command: "EDIT-USER", url: this.apiAuth.serviceUrls.RESOURCE_SERVER + "/edit-user", token: true, next: "CALLBACK" }
          ]
        }
      ]
    }

    // call popup window for form login
    this.apiCommons.openModal(DynamicFormMobilePage,
      {
        parent: this,                 // for dismiss child component
        callback: this.callbackLogin, // function for callback process result of form
        form: form                    // form dynamic 
      }
    );
  }

  /**
   * Tạo user mới
   * @param token 
   */
  createNewUser(username, token) {

    let form = {
      title: "TẠO THÔNG TIN CÁ NHÂN"
      //khong cho nut hom
      , items: [
        { name: "Điền đầy đủ thông tin sau", type: "title" }
        , { key: "nickname", name: "Biệt danh", hint: "Nickname", type: "text", input_type: "text", icon: "heart", validators: [{ required: true, min: 1 }] }
        , { key: "fullname", name: "Họ và tên", hint: "Họ và tên đầy đủ", type: "text", input_type: "text", icon: "person", validators: [{ required: true, min: 5 }] }
        , { key: "address", name: "Địa chỉ", hint: "Địa chỉ đầy đủ", type: "text", input_type: "text", icon: "pin", validators: [{ required: true, min: 5 }] }
        , { key: "phone", name: "Điện thoại liên hệ", hint: "Yêu cầu định dạng số điện thoại nhé", type: "text", input_type: "tel", icon: "call", validators: [{ pattern: "^[0-9]*$" }] }
        , { key: "email", value: username + "@mobifone.vn", name: "email", hint: "Yêu cầu định dạng email nhé", type: "text", input_type: "email", icon: "mail", validators: [{ pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }] }
        , { key: "avatar", type: "image", name: "ẢNH ĐẠI DIỆN", value: "assets/imgs/avatar.jpg" }
        , { key: "background", type: "image", name: "ẢNH NỀN", value: "assets/imgs/background-idea.jpg" }
        , {
          type: "button"
          , options: [
            { name: "Tạo mới", command: "CREATE-USER", url: this.apiAuth.serviceUrls.RESOURCE_SERVER + "/create-user", token: token, next: "CALLBACK" }
          ]
        }
      ]
    }

    // call popup window for form login
    this.apiCommons.openModal(DynamicFormMobilePage,
      {
        parent: this,                 // for dismiss child component
        callback: this.callbackLogin, // function for callback process result of form
        form: form                    // form dynamic 
      }
    );
  }


  /**
   * Hàm gọi lại cho form popup
   */
  callbackLogin = function (res) {
    // allway return Promise for callback
    return new Promise<any>((resolve, reject) => {
      if (res.error) {
        // console.log('res', res.error.message , res.message,'Error:<br>' + (res.error.message!=undefined ? res.error.message : res.message ? res.message : ("Error Unknow: " + JSON.stringify(res.error, null, 2))))
        this.apiCommons.presentAlert('Error:<br>' + (res.error.message != undefined ? res.error.message : res.message ? res.message : ("Error Unknow: " + JSON.stringify(res.error, null, 2))));
      } else if (res.response_data) {
        if (res.button.command === "LOGIN") {
          this.checkRight(res.response_data);
        }
        if (res.button.command === "CREATE-USER") {
          this.saveToken(res.button.token, res.response_data.data);
        }
        if (res.button.command === "EDIT-USER") {
          this.userInfo = res.response_data.data
          this.mainService.saveUserInfo(this.userInfo)
          this.showUserInfo()
        }
      }

      // close form
      resolve({ next: "CLOSE" });

    });
  }.bind(this);

  /**
   * Kiểm tra quyền truy cập
   * @param resData 
   */
  checkRight(resData) {
    // nếu user chưa có hoặc cần khai báo thông tin cá nhân để đăng nhập
    this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-user-info', resData.token)
      .then(result => {
        // console.log('result: ', result);
        if (result && result.status === 'OK') {
          if (result.data) {
            // login thanh cong
            this.apiCommons.showToast('Login thành công', 3000);
            this.saveToken(resData.token, result.data);
          } else {
            // Chưa có user cần khai báo
            this.createNewUser(resData.username, resData.token);
          }
        }
      })
      .catch(err => {
        console.log('Lỗi: ', err);
        this.apiCommons.showToast('Lỗi login!', 3000);
      });
  }

}
