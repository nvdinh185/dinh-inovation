import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, CommonsService, PopoverCardComponent, DynamicFormMobilePage } from 'ngxi4-dynamic-service';
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

    // kiểm tra quyền của userInfo mà hiển thị menu khác nhau

    // nếu user không thuộc ý tưởng, thì có quyền đánh giá và khảo sát mức độ của ý tưởng này
    // menu đánh giá (cho điểm ý tưởng này - mỗi người chỉ được đánh giá cho điểm --)
    // hiển thị các tiêu chí để đánh giá .... khảo sát như là biên bản khảo sát đánh giá cho điểm vậy

    // nếu là ý tưởng thuộc user thì cho phép sửa nội dung

    // nếu user có quyền role như sau
    /**
     * 
      1	User thường	User -- hiển thị mỗi một menu đánh giá
      
      --- hiển thị menu đánh giá -- ý tưởng này - cho điểm theo từng tiêu chí
      2	Chủ tịch hội đồng KHCN	Chủ tịch hội đồng KHCN
      3	Thành viên Hội đồng KHCN	Thành viên Hội đồng KHCN

      -- hiển thị tất cả các menu
      98	Admin	Quản trị hệ thống -- hiển thị hết menu
      99	Developper	Người phát triển -- hiển thị hết menu

      -- xem kết quả đánh giá khảo sát ý tưởng này ....


     */

    let settingsMenu = [];
    // menu đầy đủ
    // trường hợp nào thì sẽ xóa bỏ menu tương ứng
    const allMenu = [
      //  chỉ cho admin 98,99 và user_id của ý tưởng trùng với nó
      // Cho tất cả mọi người trừ userInfo==idea
      {
        id: 1
        , name: "Đánh giá ý tưởng này"
        , value: "MARK"
        , icon: {
          name: "microphone"
          , color: "warning"
        }
      }
      ,
      {
        id: 2
        , name: "Sửa ý tưởng này"
        , value: "EDIT"
        , icon: {
          name: "create"
          , color: "primary"
        }
      }
      ,
      // chỉ cho admin 98,99, và user_id của ý tưởng trùng với nó
      {
        id: 3
        , name: "Chuyển trạng thái"
        , value: "CHANGE"
        , icon: {
          name: "hourglass"
          , color: "primary"
        }
      }
      ,
      // chỉ cho admin 98,99 soát và merge
      {
        id: 4
        , name: "Ghép với ..."
        , value: "MERGE"
        , icon: {
          name: "git-merge"
          , color: "primary"
        }
      }
      ,
      // chỉ cho admin 98,99 soát và merge
      {
        id: 5
        , name: "Chưa phù hợp"
        , value: "TRASH"
        , icon: {
          name: "trash"
          , color: "danger"
        }
      }
    ]

    // console.log(this.ideaInfo.idea, this.userInfo);

    if (this.userInfo && this.ideaInfo && this.ideaInfo.idea) {
      if (this.ideaInfo.idea.user_id === this.userInfo.id) {
        settingsMenu = allMenu.filter(x => x.id === 2 || x.id === 3)
      } else {
        settingsMenu = allMenu.filter(x => x.id === 1)
      }

      if (
        this.userInfo.role === 98
      ) {
        settingsMenu = settingsMenu.concat(allMenu.filter(x => x.id !== 1 && x.id !== 2 && x.id !== 3))
      } else if (this.userInfo.role === 99) {
        settingsMenu = allMenu
      } else if (
        this.userInfo.role === 2
        ||
        this.userInfo.role === 3
      ) {

      } else {

      }

    } else {

    }

    this.apiCommons.presentPopover(
      ev
      , PopoverCardComponent
      , {
        type: 'single-choice',
        title: "Thực thi",
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
    // console.log('lenh', cmd);
    if (this.ideaInfo && this.ideaInfo.idea) {
      if (cmd === 'MARK') {
        //  chấm điểm ý tưởng
        this.markIdea(this.ideaInfo.idea)
      }
      if (cmd === 'EDIT') {
        //  sửa ý tưởng này
        this.editIdea(this.ideaInfo.idea)
      }
      if (cmd === 'CHANGE') {
        //  thay đổi trạng thái ý tưởng
        this.changeStatusIdea(this.ideaInfo.idea)
      }
      if (cmd === 'MERGE') {
        //  ghép ý tưởng
        this.mergeIdea(this.ideaInfo.idea)
      }
      if (cmd === 'TRASH') {
        //  loại bỏ ý tưởng này
        this.trashIdea(this.ideaInfo.idea)
      }
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

  // chấm điểm ý tưởng này theo các tiêu chí định nghĩa
  markIdea(idea) {
    // Chấm điểm ý tưởng - popup cửa sổ chấm điểm
    let form: any = {
      title: 'Chấm điểm ý tưởng'
      , buttons: [
        { color: 'danger', icon: 'close', next: 'CLOSE' }
      ]
      , items: [
        { type: 'title', name: idea.title, key: 'id', value: idea.id }
        , { type: "range-text", key: "poit_1", name: "Rõ ràng?", icon: "megaphone", disabled: true, value: 0, min: 0, max: 10 }
        , { type: "range-text", key: "poit_2", name: "Hiệu quả?", icon: "paper-plane", color: "warning", disabled: true, value: 0, min: 0, max: 10 }
        ,
        {
          type: 'button'
          , options: [
            {
              name: 'Gửi đánh giá'    // button name
              , next: 'CALLBACK'      // callback get resulte or json
              , url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/mark-idea'
              , token: true           // token login before interceptor or token string
              , command: 'MARK'       // extra parameter for callback process
            }
          ]
        }
      ]
    }

    // call popup window for form login
    this.apiCommons.openModal(DynamicFormMobilePage,
      {
        parent: this,  // for dismiss child component
        callback: this.callbackProcess, //function for callback process result of form
        form: form    // form dynamic 
      }
    );

  }

  // sửa lại ý tưởng này
  editIdea(idea) {
    // popup cửa sổ này lên và cho phép chỉnh sửa ý tưởng này

  }

  // Chuyển trạng thái của ý tưởng
  changeStatusIdea(idea) {

  }

  // Ghéo ý tưởng
  mergeIdea(idea) {

  }

  // loại bỏ ý tưởng này
  trashIdea(idea) {
    this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.RESOURCE_SERVER + "/trash-idea", { id: idea.id }, true)
      .then(data => {
        console.log('Data: ', data);
      })
      .catch(err => {
        console.log('Lỗi: ', err);
      });
  }

  // hàm gọi lại xử lý form popup
  callbackProcess = function (res) {
    // allway return Promise for callback
    return new Promise<any>((resolve, reject) => {

      console.log(res);

      if (res.error) {
        //If error 
        this.apiCommons.presentAlert('Error:<br>' + (res.message ? res.message : "Error Unknow: " + JSON.stringify(res.error, null, 2)));

      } else if (res.response_data) {
        // Data return when server response or sqlite app respone
        // next="CALLBACK", url="http://..." [,token: true | wzI...]
        if (res.button.command === "MARK") {
          // Do any for command

        }

      }

      // close form
      resolve({ next: "CLOSE" });

    });
  }.bind(this);

}
