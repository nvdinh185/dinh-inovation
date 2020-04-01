import { Injectable } from '@angular/core';
import { ApiStorageService, AuthService, CommonsService } from 'ngxi4-dynamic-service';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  token: string;
  userInfo: any;

  constructor(
    private apiStorage: ApiStorageService,
    private apiAuth: AuthService,
    private apiCommons: CommonsService
  ) { }

  /**
   * Đọc token từ đĩa, nếu có thì đẩy lên server để xác thực
   * Nếu xác thực thành công thì trả về userInfo
   */
  getTokenInfo() {
    return new Promise(async (resolve, reject) => {
      if (this.token && this.userInfo) {
        resolve(this.userInfo);
      } else {
        // this.apiStorage.delete("TOKEN");
        let token = this.apiStorage.read("TOKEN");
        // console.log(token);
        if (token) {
          try {
            let result = await this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-user-info', token)
            // console.log(result);
            if (result && result.status === 'OK' && result.data) {
              this.userInfo = result.data;
              this.token = token;
              this.apiAuth.token = token;
              resolve(this.userInfo);
            } else {
              reject()
            }
          } catch (e) {
            reject()
          }
        } else {
          reject()
        }
      }
    })
  }

  saveUserInfo(userInfo: any) {
    this.userInfo = userInfo;
  }

  /**
   * Lưu token xuống đĩa
   * @param token 
   */
  saveToken(token: string, userInfo: any) {
    this.apiStorage.save("TOKEN", token);
    this.userInfo = userInfo;
    // Lưu token trong interceptor để sử dụng post, request tự động chèn token 
    this.apiAuth.token = token;
    this.apiCommons.publish('event-login-ok', this.userInfo);
  }

  /**
   * Xóa token khỏi đĩa
   * Gán các thông số bằng null
   */
  logout() {
    this.apiStorage.delete("TOKEN");
    this.token = null;
    this.userInfo = null;
    this.apiAuth.token = null;
    this.apiCommons.publish('event-logout-ok');
  }

  getUserInfo() {
    return this.userInfo;
  }
}