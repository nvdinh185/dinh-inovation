import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'ngxi4-dynamic-service';
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
    created_time: Date.now()
  };

  userInfo: any;
  message: string;

  conversion: any = {};

  conversations = [];

  isRepairing: boolean = false;

  constructor(
    private route: ActivatedRoute
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
    if (this.message && this.message.length > 0) {
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

            // muốn sửa câu trả lời thì sửa ngay cái đối tượng này
            this.conversion.response = answer.message;

            this.conversations.unshift({
              request: this.conversion.request,
              response: this.conversion.response,
              created_time: this.conversion.created_time
            })
          }
        })
        .catch(err => console.log('Lỗi lấy chi tiết', err))

      this.message = '';
    }
  }

  // khi bấm enter để gửi lệnh
  keyInput() {
      this.onClickSend();
  }

  // bấm vào menu
  onClickMore(evt){

  }

  // sửa câu trả lời
  // thì hiển thị câu trả lời ngay ở dưới ô
  onClickRepair() {
    this.isRepairing = true;
  }

}
