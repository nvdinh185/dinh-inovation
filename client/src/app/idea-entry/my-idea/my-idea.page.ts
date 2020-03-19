/**
 * Trang này sẽ hiển thị tất cả các ý tưởng mà tôi đã tương tác
 * Bao gồm: ý tưởng của tôi, ý tưởng tôi thích, ý tưởng tôi comment,
 * 
 */
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { AuthService, CommonsService, PopoverCardComponent } from 'ngxi4-dynamic-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-idea',
  templateUrl: './my-idea.page.html',
  styleUrls: ['./my-idea.page.scss'],
})
export class MyIdeaPage implements OnInit {
  userInfo: any;
  myIdeas: any;
  isMyIdeaOnly: boolean;
  myIdeaFilterList: any;
  parameters: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute
    , private apiCommons: CommonsService
    , private apiAuth: AuthService
    , private mainService: MainService
  ) {
    this.userInfo = this.mainService.getUserInfo();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(item => {
      // console.log('item = queryParams = { id : 1}', item);
      // đọc để lấy danh sách ý tưởng mà user đó quan tâm ra
      this.refresh();
    });
  }

  async refresh() {
    this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-my-idea?username=' + this.userInfo.username, true)
      .then(data => {
        this.myIdeas = data;
        this.myIdeaFilterList = data;
        console.log(this.myIdeaFilterList);
      })
      .catch(err => console.log('Lỗi lấy thông tin người dùng', err))
    try {
      this.parameters = await this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea-parameters', true)
    } catch{ }
    console.log(this.parameters);
  }

  onUserEnterSearch(evt) {
    console.log(evt.detail.value);
    const searchTxt = evt.detail.value;
    let matches = [];
    if (searchTxt.length === 0) {
      this.myIdeaFilterList = this.myIdeas;
    } else {
      this.myIdeas.forEach((entry) => {
        if (
          entry.title.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1
          || entry.username.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1
        ) {
          matches.push(entry);
        }
      });
      this.myIdeaFilterList = matches;
    }

  }

  onViewUserPage(evt, idea) {
    // Xử lý click Avatar user và render page user người khác
  }
  
  onViewIdeaDetail(evt, idea) {
    this.router.navigate(['/idea-detail'], { queryParams: {id:idea.id} });
  }

  onClickMore(ev) {
    const settingsMenu = [
      {
        id: 1
        , name: "Ý tưởng của tôi"
        , value: "MYIDEA"
      }
      ,
      {
        id: 2
        , name: "Ý tưởng tôi thích"
        , value: "LIKE"
      }
      ,
      {
        id: 3
        , name: "Ý tưởng tôi bình luận"
        , value: "COMMENT"
      }
      ,
      {
        id: 4
        , name: "Chọn tất cả"
        , value: "ALL"
      }
      ,
    ]

    // console.log(this.ideaInfo.idea, this.userInfo);

    this.apiCommons.presentPopover(
      ev
      , PopoverCardComponent
      , {
        type: 'multi-choice',
        title: "LỌC Ý TƯỞNG THEO",
        color: "primary",
        menu: settingsMenu
      })
      .then(data => {
        // console.log(data);
        this.processDetails(data);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  processDetails(data: any) {
    if (data.length === 0) { // Xử lý khi user không chọn gì cả
      return;
    } else {
      // Tạo 3 mảng riêng chứa thông tin theo từng select filter
      let myIdeaArr = [];
      let myLikeArr = [];
      let myCommentArr = [];
      for (let el of this.myIdeas) {
        if (el.user_id === this.userInfo.id) {
          myIdeaArr.push(el);
        }
        if (el.voted_users && el.voted_users.includes(this.userInfo.id)) {
          myLikeArr.push(el);
        }
        if (el.commented_users && el.commented_users.includes(this.userInfo.id)) {
          myCommentArr.push(el);
        }
      }
      // Push tất cả vào mảng filter chung nếu user có chọn
      let filteredArr = []
      for (let select of data) {
        console.log(select);
        if (select.value === "MYIDEA") {
          filteredArr.push(...myIdeaArr);
        }
        if (select.value === "LIKE") {
          filteredArr.push(...myLikeArr);
        }
        if (select.value === "COMMENT") {
          filteredArr.push(...myCommentArr);
        }
        if (select.value === "ALL") {
          filteredArr = this.myIdeas;
        }
      }
      // Lấy ra mảng filter chứa idea đã lọc
      this.myIdeaFilterList = [...new Set(filteredArr)];
    }
  }

}
