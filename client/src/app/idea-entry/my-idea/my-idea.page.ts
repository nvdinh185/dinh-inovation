/**
 * Trang này sẽ hiển thị tất cả các ý tưởng mà tôi đã tương tác
 * Bao gồm: ý tưởng của tôi, ý tưởng tôi thích, ý tưởng tôi comment,
 * 
 */
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { AuthService, CommonsService } from 'ngxi4-dynamic-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-idea',
  templateUrl: './my-idea.page.html',
  styleUrls: ['./my-idea.page.scss'],
})
export class MyIdeaPage implements OnInit {

  constructor(
    private route: ActivatedRoute
    , private apiCommons: CommonsService
    , private apiAuth: AuthService
    , private mainService: MainService
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(item => {
      // console.log('item = queryParams = { id : 1}', item);
      // đọc để lấy danh sách ý tưởng mà user đó quan tâm ra
      this.refresh(item.id)
    });
  }

  refresh(id) {
    /* this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea?id=' + id, true)
      .then(ideaDetail => {
        this.ideaInfo = ideaDetail
        this.refreshUserAction()
      })
      .catch(err => console.log('Lỗi lấy chi tiết', err)) */
  }

  onClickMore(){
    
  }
}
