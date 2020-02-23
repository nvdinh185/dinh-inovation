import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, CommonsService, PopoverCardComponent } from 'ngxi4-dynamic-service';
import { MainService } from 'src/app/services/main.service';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-idea-detail',
  templateUrl: './idea-detail.page.html',
  styleUrls: ['./idea-detail.page.scss'],
})
export class IdeaDetailPage implements OnInit {

  userInfo: any;
  ideaInfo: any;
  message: string;

  uploadingFiles: any = [];

  constructor(
    private route: ActivatedRoute
    , private apiCommons: CommonsService
    , private apiAuth: AuthService
    , private mainService: MainService
    , private iab: InAppBrowser
  ) { }

  ngOnInit() {

    this.init();

    this.route.queryParams.subscribe(item => {
      // console.log('item', item);
      // đọc chi tiết để hiển thị nội dung chi tiết ra
      this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea?id=' + item.id, true)
        .then(ideaDetail => {
          this.ideaInfo = ideaDetail
          // console.log('chi tiết', this.ideaInfo);
          this.refreshUserAction()
        })
        .catch(err => console.log('Lỗi lấy chi tiết', err))
    });
  }

  init() {
    this.userInfo = this.mainService.getUserInfo();
  }

  refreshUserAction() {
    if (this.ideaInfo && this.ideaInfo.likes && this.ideaInfo.comments) {

      if (this.ideaInfo.idea && this.ideaInfo.idea.attach_id_list) {
        // thực hiện truy vấn lấy danh sách file đính kèm - tên file, kiểu file, id để hiển thị ra
        this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-attach-files?id_list=' + JSON.stringify(this.ideaInfo.idea.attach_id_list), true)
          .then(list => {

            if (list && Array.isArray(list.images)) {
              this.ideaInfo.idea.images = list.images;
              this.ideaInfo.idea.images.forEach(file => file.src = this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-file-id?id=" + file.id)
            }

            if (list && Array.isArray(list.files)) {
              this.ideaInfo.idea.attachs = list.files;
            }

          })
          .catch(err => {
            console.log('Lỗi lấy file: ', err);
          });

      }
      this.ideaInfo.isUserVoted = this.ideaInfo.likes.findIndex(x => x.user_id === this.userInfo.id && x.activities_type > 0) >= 0
      this.ideaInfo.isUserCommented = this.ideaInfo.comments.findIndex(x => x.user_id === this.userInfo.id) >= 0
      this.ideaInfo.comments.forEach(el => {
        // if (!el.content) el.content = "Co noi dung nay";
        if (el.attach_id_list) {
          // thực hiện truy vấn lấy danh sách file đính kèm - tên file, kiểu file, id để hiển thị ra
          this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-attach-files?id_list=' + JSON.stringify(el.attach_id_list), true)
            .then(list => {

              if (list && Array.isArray(list.images)) {
                el.images = list.images;
                el.images.forEach(file => file.src = this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-file-id?id=" + file.id)
              }

              if (list && Array.isArray(list.files)) {
                el.attachs = list.files;
              }

            })
            .catch(err => {
              console.log('Lỗi lấy file: ', err);
            });
        }
      })
    }
  }

  // Gửi nội dung comment đi
  onClickSend() {
    if (this.message || this.uploadingFiles.length > 0) {

      this.apiCommons.showLoader('Đang xử lý dữ liệu trên máy chủ....')

      let form_data: FormData = new FormData();
      form_data.append("id", this.ideaInfo.idea.id);
      form_data.append("content", this.message ? this.message : this.uploadingFiles.length + ' files');
      let i = 0;
      for (let file of this.uploadingFiles) {
        form_data.append('file_' + i++, file, file.filename);
      }
      this.apiAuth.postDynamicFormData(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/comment-idea'
        , form_data
        , true)
        .then(idea => {
          this.apiCommons.hideLoader();
          this.ideaInfo = idea; // lấy lại nội dung này
          this.refreshUserAction()
        })
        .catch(err => {
          this.apiCommons.hideLoader();
          // console.log('Lỗi: ', err);
        });

      this.message = '';
      this.uploadingFiles = [];
    }
  }

  // Bấm vào nút more 
  onClickMore(ev) {
    let settingsMenu = [
      {
        name: "Sửa nội dung"
        , value: "EDIT"
        , icon: {
          name: "create"
          , color: "primary"
        }
      }
      ,
      {
        name: "Chuyển trạng thái"
        , value: "CHANGE"
        , icon: {
          name: "mail"
          , color: "primary"
        }
      }
      ,
      {
        name: "Ghép với ..."
        , value: "MERGE"
        , icon: {
          name: "mail"
          , color: "primary"
        }
      }
      ,
      {
        name: "Chưa phù hợp"
        , value: "TRASH"
        , icon: {
          name: "trash"
          , color: "danger"
        }
      }
    ]

    this.apiCommons.presentPopover(
      ev
      , PopoverCardComponent
      , {
        type: 'single-choice',
        title: "Thiết đặt",
        color: "primary",
        menu: settingsMenu
      })
      .then(data => {
        this.processDetails(data);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  // Thực thi lệnh của end user chọn menu setting
  processDetails(itemOrItems: any) {
    let cmd = itemOrItems.value;
    console.log('lenh', cmd);

    if (cmd === 'EDIT') {
      //  do send

    }
  }

  // Người dùng bấm nút like
  // Gửi lên máy chủ lệnh like từ token này
  likeIdea(item) {
    // id và token chứa user like id này
    this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/like-idea', { id: item.id }, true)
      .then(idea => {
        this.ideaInfo = idea; // lấy lại nội dung này
        this.refreshUserAction()
      })
      .catch(err => console.log(err))
  }

  // Sự kiện khi người dùng chọn file lên để upload
  uploadFilesEvent(evt) {
    if (!evt.target || !evt.target.files || !evt.target.files.length) return
    for (let file of evt.target.files) {
      if (file.type.indexOf('image') >= 0) {
        file.isImage = true;
        const fr = new FileReader();
        fr.onloadend = (loadEvent) => {
          file.image = fr.result;
        };
        fr.readAsDataURL(file);
      }
      if (!this.uploadingFiles.find(x => x.name === file.name))
        this.uploadingFiles.push(file)
    }
  }

  onClickRemoveFile(idx) {
    this.uploadingFiles.splice(idx, 1);
  }


  // Đọc hiển thị file ra
  onClickViewFile(fileId) {
    const browser = this.iab.create(this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-file-id?id=" + fileId, `_system`);
  }

  // Hiển thị ảnh thật
  onClickViewImage(fileId) {
    const browser = this.iab.create(this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-file-id?id=" + fileId, `_system`);
  }

}
