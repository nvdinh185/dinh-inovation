/**
 * Trang này sẽ hiển thị tất cả các ý tưởng mà tôi đã tương tác
 * Bao gồm: ý tưởng của tôi, ý tưởng tôi thích, ý tưởng tôi comment,
 * 
 * Không chỉ xem ý tưởng của tôi mà còn xem ý tưởng của bất kỳ ai
 * 
 * userInfo không phải là user login vào mà sẽ lấy user từ tham số yêu cầu chuyển sang
 * 
 */
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { AuthService, CommonsService, PopoverCardComponent } from 'ngxi4-dynamic-service';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-my-idea',
  templateUrl: './my-idea.page.html',
  styleUrls: ['./my-idea.page.scss'],
})
export class MyIdeaPage implements OnInit {

  // danh sách bộ lọc cần lọc nếu lấy chừng này dữ liệu thôi
  filters = {
    MYIDEA: "MYIDEA",
    LIKE: "LIKE",
    COMMENT: "COMMENT",
    MARK: "MARK"
  }

  userId: number;  // user lấy được khi người dùng yêu cầu

  userInfo: any;   // ghi thông tin user của người muốn xem hiển thị trên trang này

  myIdeas: any;
  isMyIdeaOnly: boolean;
  myIdeaFilterList: any;

  filterSelected: any = [];

  isMobile: boolean;

  isSearch: boolean = false;
  searchString: string;
  parameters: any;
  statusConfigs: any = {};

  constructor(
    private router: Router
    , private route: ActivatedRoute
    , private apiCommons: CommonsService
    , private apiAuth: AuthService
  ) { this.init() }

  ngOnInit() {
    this.route.queryParams.subscribe(async item => {
      // console.log('item = queryParams = { id : 1}', item);
      this.userId = item ? item.id : 0;
      // lấy thông tin người dùng cần xem ý tưởng của họ
      try {
        let getData = await this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-user-info?id=' + this.userId, true)
        this.userInfo = getData ? getData.data : {}; // nếu không lấy được thì trả về null
      } catch{ }
      // đọc để lấy danh sách ý tưởng mà user đó quan tâm ra
      // console.log('user',this.userInfo);
      this.refresh();
    });
  }

  init() {
    this.isMobile = this.apiCommons.isMobile();

    this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea-parameters', true)
      .then(data => {
        this.parameters = data;
        let statusOptions = this.parameters && this.parameters.ideas_statuses ? this.parameters.ideas_statuses : [];
        statusOptions.forEach(el => {
          Object.defineProperty(this.statusConfigs, el.id, { value: el, writable: true, enumerable: true, configurable: true });
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  // lấy thông tin user và đọc ý tưởng của tôi
  async refresh(filters?: string) {

    this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER
      + '/get-my-idea?username=' + this.userInfo.username
      + (filters ? `&filters=${filters}` : ``)
      , true)
      .then(data => {
        // có thể dùng bộ lọc ở client khi lấy về hết
        this.myIdeas = data;
        this.myIdeaFilterList = data;
      })
      .catch(err => console.log('Lỗi lấy thông tin người dùng', err))
  }


  // hiển thị ô tìm kiếm để 
  goSearch() {
    this.isSearch = true;
  }

  searchEnter() {
    this.isSearch = false;
    this.searchString = "";
  }

  onUserEnterSearch(evt) {
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

  onViewUserPage(idea) {
    // Xử lý click Avatar user và render page user người khác
    this.router.navigate(['/my-idea'], { queryParams: { id: idea.user_id } });
  }

  onViewIdeaDetail(evt, idea) {
    this.router.navigate(['/idea-detail'], { queryParams: { id: idea.id } });
  }

  onClickMore(idea) {
    idea.isShowHistory = ! idea.isShowHistory;
  }

  onClickFilter(ev) {
    const settingsMenu = [
      {
        id: 1
        , name: "Ý tưởng của tôi"
        , isChecked: this.filterSelected.includes(this.filters.MYIDEA)
        , value: this.filters.MYIDEA
      }
      ,
      {
        id: 2
        , name: "Ý tưởng tôi thích"
        , isChecked: this.filterSelected.includes(this.filters.LIKE)
        , value: this.filters.LIKE
      }
      ,
      {
        id: 3
        , name: "Ý tưởng tôi bình luận"
        , isChecked: this.filterSelected.includes(this.filters.COMMENT)
        , value: this.filters.COMMENT
      }
      ,
      {
        id: 4
        , name: "Ý tưởng tôi đánh giá"
        , isChecked: this.filterSelected.includes(this.filters.MARK)
        , value: this.filters.MARK
      }
    ]

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
        this.processDetails(data);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  processDetails(data: any) {
    // lọc lấy bộ lọc để lấy dữ liệu, nếu bộ lọc đó không lọc thì xem như lấy hết
    this.filterSelected = [];
    data.forEach(el => {
      this.filterSelected.push(el.value);
    });
    // ta sẽ có một bộ mảng ["MYIDEA",...] hoặc bộ [] 
    // cần chuyển đổi mảng này thành chuổi cách nhau bởi dấu , để đưa lên máy chủ
    this.refresh(this.filterSelected.toString(','))
  }

}