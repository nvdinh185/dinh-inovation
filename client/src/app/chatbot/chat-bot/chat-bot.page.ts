import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, CommonsService, PopoverCardComponent, DynamicFormMobilePage } from 'ngxi4-dynamic-service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.page.html',
  styleUrls: ['./chat-bot.page.scss'],
})
export class ChatBotPage implements OnInit {

  chatbot: any = {
    avatar: "assets/imgs/avatar-ai.jpg",
    username: "AI-NLP-Mobifone-C3",
    fullname: "Tôi là máy học, hiện thôi mới sinh ra, bạn hãy dạy cho tôi học nhé!",
    created_time: Date.now()
  };

  userInfo: any;
  message: string;

  conversion: any = {};

  conversations = [];

  isRepairing: boolean = false;
  answer: string;

  constructor(
    private route: ActivatedRoute
    , private apiCommons: CommonsService
    , private apiAuth: AuthService
    , private mainService: MainService
  ) { }

  ngOnInit() {
    this.init();

    this.route.queryParams.subscribe(item => {
      this.refresh(item)
    });
  }

  // đọc dữ liệu user
  init() {
    this.userInfo = this.mainService.getUserInfo();
  }

  // làm mới trang
  refresh(item) {
    this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.SOCKET_SERVER + '/request-answer'
      , {
        message: 'Xin chào'
      }
      , true)
      .then(answer => {
        if (answer && answer.status === "OK") {
          // ban đầu máy sẽ tự động trả lời theo câu chào hỏi ban đầu
          this.conversations.unshift({
            response: answer.message,
            created_time: Date.now()
          })
        }
      })
      .catch(err => console.log('Lỗi lấy chi tiết', err))
  }

  // Gửi nội dung comment đi bằng nút bấm
  onClickSend() {
    if (this.message) {
      this.message = this.message.replace(/\r?\n|\r/g, '')
      if (this.message.length > 0) {
        // khai báo bản ghi người hỏi
        this.conversion = {
          request: this.message,
          created_time: Date.now()
        }
        this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.SOCKET_SERVER + '/request-answer'
          , {
            message: this.message
          }
          , true)
          .then(answer => {
            if (answer && answer.status === "OK") {
              // ghi nhận bảng ghi máy trả lời
              this.conversations.unshift({
                request: this.conversion.request,
                response: answer.message,
                created_time: this.conversion.created_time
              })
              // muốn sửa câu trả lời thì sửa ngay cái đối tượng này
              // thì gán đối tượng đàm thoại bằng bảng ghi cuối cùng để sửa
              this.conversion = this.conversations[0]
            }
            this.message = ''
          })
          .catch(err => {
            console.log(err);
            this.message = ''
          })
        this.message = ''
      }
    }
  }

  // khi bấm enter để gửi lệnh
  keyInput() {
    this.onClickSend();
  }

  // bấm vào menu
  onClickMore(evt) {

    const allMenu = [
      //  chỉ cho admin 98,99 và user_id của ý tưởng trùng với nó
      // Cho tất cả mọi người trừ userInfo==idea
      {
        id: 1
        , name: "Giảng bài cho máy"
        , value: "EDIT-INTENT"
        , icon: {
          name: "create"
          , color: "success"
        }
      }
      ,
      {
        id: 2
        , name: "Kiểm tra độ chính xác"
        , value: "VIEW-PROB"
        , icon: {
          name: "checkmark-circle"
          , color: "secondary"
        }
      },
      {
        id: 3
        , name: "Huấn luyện cho máy"
        , value: "TRAIN"
        , icon: {
          name: "microphone"
          , color: "warning"
        }
      }
    ]

    // Nếu user không login thì không cho chạy huấn luyện
    if (!this.userInfo) {
      allMenu.splice(2, 1)
    }

    if (!this.conversion || !this.conversion.request) {
      allMenu.splice(1, 1)
    }


    this.apiCommons.presentPopover(
      evt
      , PopoverCardComponent
      , {
        type: 'single-choice',
        title: "Tác vụ",
        color: "primary",
        menu: allMenu
      })
      .then(data => {
        this.processDetails(data);
      })
      .catch(err => {
        // console.log('err: ', err);
      });
  }

  // Thực thi lệnh của end user chọn menu setting
  processDetails(itemOrItems: any) {
    let cmd = itemOrItems.value;
    // thực hiện gọi hàm huấn luyện
    // kết quả huấn luyện thành công sẽ mở cửa sổ alert
    if (cmd === 'TRAIN') {
      // kiểm tra user đã đánh giá hay chưa
      this.apiCommons.showLoader('Đang huấn luyện cho máy vui lòng đợi...')
      this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.SOCKET_SERVER + "/run-train"
        , { command: 'run-train' }, true)
        .then(result => {
          this.apiCommons.hideLoader()
          this.apiCommons.showToast(result && result.message ? result.message : 'Đã huấn luyện thành công, bạn có thể test thử nhé', 2000, 'success')
        })
        .catch(err => {
          // console.log('err', err);
          this.apiCommons.hideLoader()
          this.apiCommons.showToast(err && err.message ? err.message : 'Lỗi huấn luyện cho máy', 3000, 'danger')
        })
    }

    // truy vấn xác suất của câu hỏi vừa mới đưa lên
    // kết quả trả về hiển thị lên màn hình popup
    if (cmd === 'VIEW-PROB') {
      this.checkProbRequest()
    }

    // mở trang intent câu hỏi và câu trả lời
    if (cmd === 'EDIT-INTENT') {

    }

  }

  // sửa câu trả lời
  // thì hiển thị câu trả lời ngay ở dưới ô
  onClickRepair() {
    if (this.isRepairing && (!this.conversion.response || !this.conversion.intent_name)) {
      // yêu cầu nhập đủ ý định và đáp ứng mới cho lưu được
      this.conversion.invalid = true;
      return;
    }

    // nếu yêu cầu lưu trữ thông tin đã chỉnh sửa
    if (this.isRepairing && this.conversion.request && this.conversion.response && this.conversion.intent_name) {
      // console.log(this.conversion);
      // các thông tin đã đầy đủ thì post lên máy chủ và trả kết quả về
      this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.SOCKET_SERVER + "/train-answer"
        , {
          request: this.conversion.request,
          response: this.conversion.response,
          intent_name: this.conversion.intent_name
        }, true)
        .then(result => {
          // console.log('data', result);
          this.apiCommons.showToast(result && result.message ? result.message : 'Soạn bài giảng cho máy thành công', 2000, 'success')
        })
        .catch(err => {
          // console.log('err', err);
          this.apiCommons.showToast(err && err.message ? err.message : 'Lỗi soạn bài giảng cho máy', 3000, 'danger')
        })
    }
    this.isRepairing = !this.isRepairing;
  }


  // Đóng cửa sổ huấn luyện
  onClickClose() {
    this.isRepairing = false;
  }


  /**
   * Gửi lệnh lênh máy chủ thông tin yêu cầu, máy chủ trả về 3 chuỗi xác suất nhé
   */
  checkProbRequest() {

    this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.SOCKET_SERVER + "/get-predict?message=" + this.conversion.request, true)
      .then(results => {
        this.showResultCheck(results);
      })
      .catch(err => {
        this.apiCommons.showToast(err && err.message ? err.message : 'Lỗi kiểm tra xác suất', 3000, 'danger')
      })
  }


  showResultCheck(results) {

    let details: any = {
      type: "details",
      details: []
    }

    let title = "Câu nói: ";

    for (let idx = 0; idx < results.length; idx++) {
      let el = results[idx];
      if (idx === 0) title += el.text;
      details.details.push({
        name: (el.intent && el.intent.name ? el.intent.id + "# " + el.intent.name : el.label),
        value: (el.value * 100).toFixed(2) + "%"
      })
    }

    let form = {
      title: 'Hệ thống tìm thấy'
      , buttons: [
        { color: 'danger', icon: 'close', next: 'CLOSE' }
      ]
      , items: [
        { type: 'title', name: title }
        , details
      ]
    }

    // call popup window for form login
    this.apiCommons.openModal(DynamicFormMobilePage,
      {
        parent: this,
        callback: this.callbackProcess,
        form: form
      }
    );

  }

  /**
   * Hàm gọi lại
   */
  callbackProcess = function (res) {
    return new Promise<any>((resolve, reject) => {
      if (res.error) {
        this.apiCommons.presentAlert('Error:<br>' + (res.error.message != undefined ? res.error.message : res.message ? res.message : ("Error Unknow: " + JSON.stringify(res.error, null, 2))));
      }
      resolve({ next: "CLOSE" });
    });
  }.bind(this);

}
