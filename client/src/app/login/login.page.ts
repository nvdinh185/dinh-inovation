import { Component, OnInit } from '@angular/core';
import { AuthService, CommonsService, DynamicFormMobilePage } from 'ngxi4-dynamic-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: any = {
    title: `Login`
  }


  constructor(
    private apiCommons: CommonsService
    , private apiAuth: AuthService
  ) { }

  ngOnInit() {

    this.login();
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
          , key: 'email'         // json_key + value input ==> {username:value}
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

  callbackLogin = function (res) {
    // allway return Promise for callback
    return new Promise<any>((resolve, reject) => {
      // console.log('res',res)
      if (res.error) {
        this.apiCommons.presentAlert('Error:<br>' + res.error.message ? res.error.message : (res.message ? res.message : "Error Unknow: " + JSON.stringify(res.error, null, 2)));
      } else if (res.ajax) {
      } else if (res.response_data) {
        if (res.button.command === "LOGIN") {
          // login thành công, kiểm tra quyền truy cập đã cấp chưa? (lấy thông tin user đó)
          this.checkRight(res.response_data);
        }
      } else if (res.json_data) {
      } else {
        // 

      }

      // close form
      resolve({ next: "CLOSE" });

    });
  }.bind(this);

  checkRight(resData) {
    console.log(resData.token);
    this.apiCommons.showToast('Login thành công. Đợi kiểm tra truy cập!', 3000);
    // nếu user chưa có hoặc cần khai báo thông tin cá nhân để đăng nhập
    // trường hợp đã có thành công thì ok
    this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.AUTH_SERVER + '/verify-token', { token: resData.token }, resData.token)
      .then(data => {
        console.log('Data: ', data);
      })
      .catch(err => {
        console.log('Lỗi: ', err);
      });
  }

}
