import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'ngxi4-dynamic-service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-idea-detail',
  templateUrl: './idea-detail.page.html',
  styleUrls: ['./idea-detail.page.scss'],
})
export class IdeaDetailPage implements OnInit {

  userInfo: any;
  ideaInfo: any;

  message: string;

  constructor(
    private route: ActivatedRoute
    , private apiAuth: AuthService
    , private mainService: MainService
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

  refreshUserAction(){
    if (this.ideaInfo && this.ideaInfo.likes && this.ideaInfo.comments){
      this.ideaInfo.isUserVoted = this.ideaInfo.likes.findIndex(x=>x.user_id===this.userInfo.id && x.activities_type>0)>=0
      this.ideaInfo.isUserCommented = this.ideaInfo.comments.findIndex(x=>x.user_id===this.userInfo.id)>=0
    } 
  }

  // Gửi nội dung comment đi
  onClickSend() {
    if (this.message) {
      this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/comment-idea'
        , {
          id: this.ideaInfo.idea.id,
          content: this.message
        }
        , true)
        .then(idea => {
          // console.log('idea: ', idea);
          this.ideaInfo = idea; // lấy lại nội dung này
          this.refreshUserAction()
        })
        .catch(err => {
          console.log('Lỗi: ', err);
        });

      this.message = '';
    }
  }

  // Bấm vào nút more 
  onClickMore() {

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

}
