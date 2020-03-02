import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, CommonsService, PopoverCardComponent } from 'ngxi4-dynamic-service';
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
      if (this.message.length > 0){
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
  onClickMore(evt){
    const allMenu = [
      //  chỉ cho admin 98,99 và user_id của ý tưởng trùng với nó
      // Cho tất cả mọi người trừ userInfo==idea
      {
        id: 1
        , name: "Huấn luyện kiến thức mới"
        , value: "TRAIN"
        , icon: {
          name: "microphone"
          , color: "warning"
        }
      }
      ,
      {
        id: 2
        , name: "Kiểm tra xác suất"
        , value: "VIEW-PROB"
        , icon: {
          name: "create"
          , color: "secondary"
        }
      }
    ]


    this.apiCommons.presentPopover(
      evt
      , PopoverCardComponent
      , {
        type: 'single-choice',
        title: "Thực thi",
        color: "primary",
        menu: allMenu
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
      if (cmd === 'TRAIN') {
        // kiểm tra user đã đánh giá hay chưa

      }
      if (cmd === 'VIEW-PROB') {
        
      }
  }

  // sửa câu trả lời
  // thì hiển thị câu trả lời ngay ở dưới ô
  onClickRepair() {
    this.isRepairing = !this.isRepairing;
    // this.answer = this.conversion.response;
  }

}
