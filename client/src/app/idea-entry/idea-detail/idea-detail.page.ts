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
          console.log('chi tiết', this.ideaInfo);
          
        })
        .catch(err => console.log('Lỗi lấy chi tiết', err))
    });
  }

  init(){
    this.userInfo = this.mainService.getUserInfo();
  }


  // Gửi nội dung comment đi
  onClickSend(){
    if (this.message){

      this.message = '';
    }
  }

  // Bấm vào nút more 
  onClickMore(){

  }

  logScrollStart() {

  }

  logScrolling(evt) {

  }

  logScrollEnd() {

  }

}
