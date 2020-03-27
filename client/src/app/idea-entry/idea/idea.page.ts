import { Component, OnInit } from '@angular/core';
import { AuthService, CommonsService, PopoverCardComponent } from 'ngxi4-dynamic-service';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

// các sắp xếp ý tưởng theo
const orderList = {
  ORDER_CHANGED: 'ORDER_CHANGED'     // được thay đổi gần đây nhất
  , ORDER_CREATED: 'ORDER_CREATED'   // được tạo ra gần đây nhất
  , ORDER_LIKES: 'ORDER_LIKES'       // được yêu thích nhất
  , ORDER_COMMENTS: 'ORDER_COMMENTS' // được nhiều người bình luận nhất
  , ORDER_MARKS: 'ORDER_MARKS'       // được chấm điểm cao nhất của mọi người
  , ORDER_PRIZES: 'ORDER_PRIZES'     // được giải của hội đồng chọn cao nhất
}

const searchOptions = {
  SEARCH_ON_PAGE: 'SEARCH_ON_PAGE'     // được thay đổi gần đây nhất
  , SEARCH_BY_ID: 'SEARCH_BY_ID'   // được tạo ra gần đây nhất
  , SEARCH_BY_AI: 'SEARCH_BY_AI'       // được yêu thích nhất
}

@Component({
  selector: 'app-idea',
  templateUrl: './idea.page.html',
  styleUrls: ['./idea.page.scss'],
})
export class IdeaPage implements OnInit {

  formIdea: any = {
    title: 'Phòng ý tưởng',
    ideas: []
  }

  // tham số để chọn tùy chọn nhập mới ý tưởng
  parameters: any;

  dynamicFormInput: string;
  dynamicFormValue: string;
  dynamicCallback: any;

  isCardNewShow: boolean = false;

  userInfo: any;
  orderBy: string = orderList.ORDER_CREATED;
  filterCategorySelected: any = [];
  filterStatusSelected: any = [0, 1, 2, 3, 4, 5];

  categoryOptions: any = [];
  statusOptions: any = [];

  pageSize: number = 20;
  currentPage: number = 0;

  isMobile: boolean = false;

  isSearch: boolean = false;
  searchString: string;
  searchHint: string = 'Gõ từ có trong các chủ đề bên dưới'

  searchOption: string = searchOptions.SEARCH_ON_PAGE;

  myIdeaFilterList: any = [];

  constructor(
    private router: Router
    , private apiAuth: AuthService
    , private apiCommons: CommonsService
    , private modalController: ModalController
    , private mainService: MainService
  ) { this.init() }

  ngOnInit() {
    this.refresh();
  }

  async init() {
    // lấy thông tin user đang login có chưa?
    this.userInfo = this.mainService.getUserInfo();
    this.isMobile = this.apiCommons.isMobile()

    try {
      this.parameters = await this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea-parameters', true)
    } catch (err) {
      console.log(err);
    }

    this.categoryOptions = this.parameters && this.parameters.ideas_categories ? this.parameters.ideas_categories : [];

    this.statusOptions = this.parameters && this.parameters.ideas_statuses ? this.parameters.ideas_statuses : [];

    // form nhập liệu này
    this.dynamicFormInput = JSON.stringify({ // Form mẫu hiển thị nhập liệu tạo đối tượng jon_data
      okButton: { icon: "save", name: "Ý tưởng mới của bạn là gì?", color: "secondary", next: "CALLBACK", command: "ADD", url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/create-idea', type: "FORM-DATA", token: true }
      ,
      cancelButton: { icon: "close", next: "CLOSE" }
      ,
      items: [
        // Danh sách các trường nhập liệu
        { type: "text", key: "title", name: "Chủ đề là gì? ", hint: "Nhập chủ đề của ý tưởng này từ 5-200 ký tự (letters)", input_type: "text", icon: "help", validators: [{ required: true, min: 5, max: 200 }] }
        , { type: "text_area", key: "description", hint: "Mô tả nội dung ý tưởng của bạn từ 50 đến 1000 từ (words)", name: "Nhập mô tả ý tưởng của bạn", input_type: "text", icon: "information-circle", validators: [{ required: true, min: 10 }] }
        , { type: "select", key: "category_id", name: "Phân loại ý tưởng?", icon: "contrast", options: this.categoryOptions }
        , { type: "select", key: "status", name: "Trạng thái của ý tưởng?", icon: "clock", options: this.statusOptions }
        , {
          type: "upload-files", name: "Files đính kèm"
          , multiple: "multiple"
          , accept: `image/gif, image/jpeg, image/png
                                        , application/pdf
                                        , .txt, .md, .zip, .tar
                                        , .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel
                                        , application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document`}
      ]
    })

    // giá trị mặc định
    this.dynamicFormValue = JSON.stringify(
      {
        title: '',
        description: '',
        category_id: '' + (this.categoryOptions.find(x => x.is_default === 1) ? this.categoryOptions.find(x => x.is_default === 1).id : 2),
        status: '' + (this.statusOptions.find(x => x.is_default === 1) ? this.statusOptions.find(x => x.is_default === 1).id : 2)
      }
    )

    this.dynamicCallback = this.dynamicCallbackCard;

  }

  // hàm gọi lại khi thay đổi bộ lọc, sắp xếp, hoặc làm mới trang
  async refresh(isReset?: boolean, nextPage?: number, direction?: string) {
    if (isReset) this.currentPage = 0;

    // lấy danh sách ý tưởng từ csdl mới nhất
    let countIdeaReturn = 0;
    try {
      if (isReset) this.apiCommons.showLoader('Đang load dữ liệu');
      let ideas = await this.apiAuth.getDynamicUrl(
        this.apiAuth.serviceUrls.RESOURCE_SERVER
        + '/get-ideas?order_by=' + this.orderBy
        + '&filter_category=' + this.filterCategorySelected.toString(",")
        + '&filter_status=' + this.filterStatusSelected.toString(",")
        + '&page_size=' + this.pageSize
        + '&page=' + (nextPage ? nextPage : 0)
        , true)
      // console.log(ideas);
      // reset trang và mảng khi lấy xong dữ liệu
      if (isReset) this.formIdea.ideas = []

      if (Array.isArray(ideas)) {
        countIdeaReturn = ideas.length
        if (direction === 'UP') {
          for (let idx = countIdeaReturn - 1; idx < 0; idx--) {
            let el = ideas[idx]
            if (el.voted_users && el.voted_users.find(x => x === this.userInfo.id)) el.isUserVoted = true;
            if (el.commented_users && el.commented_users.find(x => x === this.userInfo.id)) el.isUserCommented = true;
            let findIndex = this.formIdea.ideas.findIndex(x => x.id === el.id)
            if (findIndex < 0)
              this.formIdea.ideas.unshift(el)
            else
              this.formIdea.ideas.splice(findIndex, 1, el)
          }
        } else {
          for (let idx = 0; idx < countIdeaReturn; idx++) {
            let el = ideas[idx]
            if (el.voted_users && el.voted_users.find(x => x === this.userInfo.id)) el.isUserVoted = true;
            if (el.commented_users && el.commented_users.find(x => x === this.userInfo.id)) el.isUserCommented = true;
            let findIndex = this.formIdea.ideas.findIndex(x => x.id === el.id)
            if (findIndex < 0)
              this.formIdea.ideas.push(el)
            else
              this.formIdea.ideas.splice(findIndex, 1, el)
          }
        }

      }

      this.myIdeaFilterList = this.formIdea.ideas; // lấy nguyên gốc bảng dữ liệu lấy về

      if (countIdeaReturn === 0 && this.currentPage === 0) {
        this.apiCommons.showToast('Không tìm thấy ý tưởng nào', 3000, 'danger')
      }
    } catch{ }
    finally {
      if (isReset)
        setTimeout(() => {
          this.apiCommons.hideLoader()
        }, 1000)
      return countIdeaReturn;
    }
    // Đã có danh sách ý tưởng mới lấy được từ csdl rồi
  }

  // lọc theo lĩnh vực
  onClickFilterCategory(ev?) {
    let settingsMenu = [];
    this.categoryOptions.forEach(el => {
      settingsMenu.push({
        id: el.id
        , name: el.name
        , isChecked: this.filterCategorySelected.includes(el.id)
        , value: el.id
      })
    })
    this.apiCommons.presentPopover(
      ev
      , PopoverCardComponent
      , {
        type: 'multi-choice',
        title: "LỌC THEO LĨNH VỰC",
        color: "tertiary",
        menu: settingsMenu
      })
      .then(data => {
        this.processCategoryFilters(data);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  // lọc theo trạng thái
  onClickFilterStatus(ev?) {
    let settingsMenu = [];
    this.statusOptions.forEach(el => {
      settingsMenu.push({
        id: el.id
        , name: el.name
        , isChecked: this.filterStatusSelected.includes(el.id)
        , value: el.id
      })
    })
    this.apiCommons.presentPopover(
      ev
      , PopoverCardComponent
      , {
        type: 'multi-choice',
        title: "LỌC THEO TRẠNG THÁI",
        color: "danger",
        menu: settingsMenu
      })
      .then(data => {
        this.processStatusFilters(data);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  // sắp xếp theo
  onClickOrder(ev?) {
    // console.log(this.orderBy, orderList[this.orderBy]);

    let settingsMenu = [
      {
        id: 1
        , name: "Thay đổi gần nhất"
        , isChecked: orderList[this.orderBy] === orderList.ORDER_CHANGED
        , value: orderList.ORDER_CHANGED
      }
      ,
      {
        id: 2
        , name: "Tạo gần đây nhất"
        , isChecked: orderList[this.orderBy] === orderList.ORDER_CREATED
        , value: orderList.ORDER_CREATED
      }
      ,
      {
        id: 3
        , name: "Nhiều người thích nhất"
        , isChecked: orderList[this.orderBy] === orderList.ORDER_LIKES
        , value: orderList.ORDER_LIKES
      }
      ,
      {
        id: 4
        , name: "Nhiều người bình luận nhất"
        , isChecked: orderList[this.orderBy] === orderList.ORDER_COMMENTS
        , value: orderList.ORDER_COMMENTS
      }
      ,
      {
        id: 5
        , name: "Được chấm điểm cao nhất"
        , isChecked: orderList[this.orderBy] === orderList.ORDER_MARKS
        , value: orderList.ORDER_MARKS
      }
      ,
      {
        id: 6
        , name: "Được giải cao nhất"
        , isChecked: orderList[this.orderBy] === orderList.ORDER_PRIZES
        , value: orderList.ORDER_PRIZES
      }
    ]

    this.apiCommons.presentPopover(
      ev
      , PopoverCardComponent
      , {
        type: 'single-choice',
        title: "SẮP XẾP",
        color: "success",
        menu: settingsMenu
      })
      .then(data => {
        this.processOrderBys(data);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  // xử lý lọc theo lĩnh vực
  processCategoryFilters(data: any) {
    // lọc lấy bộ lọc để lấy dữ liệu, nếu bộ lọc đó không lọc thì xem như lấy hết
    this.filterCategorySelected = [];
    data.forEach(el => {
      this.filterCategorySelected.push(el.value);
    });
    this.refresh(true)
  }

  // hàm xử lý lọc theo trạng thái
  processStatusFilters(data: any) {
    this.filterStatusSelected = [];
    data.forEach(el => {
      this.filterStatusSelected.push(el.value);
    });
    this.refresh(true)
  }

  // hàm xử lý cho sắp xếp
  processOrderBys(data: any) {
    this.orderBy = data.value;
    this.refresh(true)
  }

  // Hiển thị trang cá nhân
  onViewUserPage(userInfo) {
    // Xử lý click Avatar user và render page user người khác
    this.router.navigate(['/my-idea'], { queryParams: { id: userInfo.id } });
  }

  // hàm gọi lại xử lý ajax khi người dùng thay chọn lựa ở card nhập nội dung
  dynamicCallbackCard(ajaxItem) {
    return new Promise(resolve => {
      // console.log(ajaxItem);
      /* let ajaxReturn = {
        key: 'name',
        property_name: 'value',
        new_data: 'Tên mới thay đổi từ ajax'
      }
      // or 
      // ajaxReturns = [{...ajaxReturn}]
      resolve(ajaxReturn); */

      resolve({});

    })
  }

  // hàm trả kết quả của form nhập mới ý tưởng
  onSelectedFinish(evt) {
    // cảm ơn bạn đã gửi ý tưởng của bạn
    // console.log('ghi xong du lieu', evt);
    if (evt) this.refresh(true);        // làm mới ý tưởng mới
    this.isCardNewShow = false;
  }

  // thêm mới ý tưởng
  onClickAddNew() {
    this.isCardNewShow = true;
  }

  // Đọc lại các ý tưởng mới
  doRefresh(evt, direction) {
    if (this.isSearch) {
      evt.target.complete();
      return
    }
    if (direction === 'UP') {
      // làm mới đọc dữ liệu mới nhất 
      this.refresh(false, 0, direction)
        .then(data => {
          evt.target.complete();
        })
        .catch(err => {
          evt.target.complete();
        });;        // làm mới ý tưởng mới
    }

    if (direction === 'DOWN') {
      // làm mới trang tiếp theo
      this.refresh(false, ++this.currentPage, direction)
        .then(count => {
          evt.target.complete();
          if (count < this.pageSize) {
            this.apiCommons.showToast('Hết ý tưởng rồi', 1000, 'success', 'bottom')
            // evt.target.disabled = true; // cần thiết vô hiệu thanh kéo này
          }
        })
        .catch(err => {
          console.log('Lỗi: ', err);
          evt.target.complete();
        })
    }

  }

  // sự kiện bấm ở card ý tưởng
  // có mấy tình huống sinh ra bằng command
  onClickIdeaCard(evt) {
    // console.log(evt);
    if (evt) {
      if (evt.command === 'VIEW') {
        this.viewIdea(evt.idea);
      }
      if (evt.command === 'LIKE') {
        this.likeIdea(evt.idea);
      }
      if (evt.command === 'COMMENT') {
        this.commentIdea(evt.idea);
      }

    }
  }

  // Hiển thị item ý tưởng đó cho mọi người thông tin để biết
  viewIdea(item) {
    // mở ra một component để hiển thị thông tin ý tưởng, các chức năng như comment, like, share, edit, ... nằm ở component này
    // Chuyển tham số kiểu queryParams --> { queryParams: { page: pageNum } }
    this.router.navigate(['/idea-detail'], { queryParams: { id: item.id } });

  }

  // Người dùng bấm nút like
  // Gửi lên máy chủ lệnh like từ token này
  likeIdea(item) {
    // id và token chứa user like id này
    this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/like-idea', { id: item.id }, true)
      .then(data => {
        // console.log(data);
        let el = data.idea;
        if (el.voted_users && el.voted_users.find(x => x === this.userInfo.id)) el.isUserVoted = true;
        if (el.commented_users && el.commented_users.find(x => x === this.userInfo.id)) el.isUserCommented = true;
        let findIndex = this.formIdea.ideas.findIndex(x => x.id === el.id)
        if (findIndex >= 0) this.formIdea.ideas.splice(findIndex, 1, el)
      })
      .catch(err => console.log(err))
  }

  // người dùng bấm nút comment
  commentIdea(item) {
    this.router.navigate(['/idea-detail'], { queryParams: { id: item.id } });
  }

  // mở cửa sổ popup ở window rộng hơn mặt định của ionic
  async openModal(componentPage, navParams) {
    const myModal = await this.modalController.create({
      component: componentPage,
      componentProps: navParams,
      cssClass: 'cng-custom-modal-css'  // thiết lập css này để mở rộng màn hình tùy thích
    });
    return myModal.present();
  }

  // tùy chọn để tìm kiếm
  // Lọc chủ đề hiện có
  // Theo mã chủ đề
  // Tìm trên máy chủ
  onClickSearchOption(ev?) {
    let settingsMenu = [
      {
        id: 1
        , name: "Lọc chủ đề hiện có"
        , isChecked: searchOptions[this.searchOption] === searchOptions.SEARCH_ON_PAGE
        , value: searchOptions.SEARCH_ON_PAGE
      }
      ,
      {
        id: 2
        , name: "Theo mã ý tưởng"
        , isChecked: searchOptions[this.searchOption] === searchOptions.SEARCH_BY_ID
        , value: searchOptions.SEARCH_BY_ID
      }
      ,
      {
        id: 3
        , name: "Tìm trên máy chủ"
        , isChecked: searchOptions[this.searchOption] === searchOptions.SEARCH_BY_AI
        , value: searchOptions.SEARCH_BY_AI
      }
    ]

    this.apiCommons.presentPopover(
      ev
      , PopoverCardComponent
      , {
        type: 'single-choice',
        title: "TÙY CHỌN TÌM KIẾM",
        color: "warning",
        menu: settingsMenu
      })
      .then(data => {
        this.processSearchOptions(data);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  // bộ lọc tìm kiếm
  processSearchOptions(data: any) {
    this.searchOption = data.value;
    if (this.searchOption === searchOptions.SEARCH_ON_PAGE)
      this.searchHint = 'Gõ từ có các trong chủ đề bên dưới';
    if (this.searchOption === searchOptions.SEARCH_BY_ID)
      this.searchHint = 'Gõ mã ý tưởng để tìm';
    if (this.searchOption === searchOptions.SEARCH_BY_AI)
      this.searchHint = 'Gõ các từ có trong chủ đề cần tìm';
  }

  // hiển thị ô tìm kiếm để 
  goSearch() {
    this.isSearch = true;
  }

  searchEnter() {
    this.isSearch = false;
    if (this.searchOption === searchOptions.SEARCH_BY_AI) {
      // gọi hàm lấy thông tin từ máy chủ theo thuật toán xử lý ngôn ngữ tự nhiên của title
      // tìm 10 bảng ghi có từ tìm kiếm có nội dung gần nhất

    }
    this.searchString = "";
  }

  // chức năng tìm kiếm của ô tìm kiếm, lọc ra hoặc tìm trong csdl???
  onUserEnterSearch(evt) {
    const searchTxt = evt.detail.value;
    if (searchTxt.length > 0) {
      if (this.searchOption === searchOptions.SEARCH_ON_PAGE) {
        this.myIdeaFilterList = this.formIdea.ideas.filter(
          x => x.title.toLowerCase().indexOf(searchTxt.toLowerCase()) >= 0
            || ("" + x.id).indexOf(searchTxt) >= 0
            || (x.full_name && x.full_name.toLowerCase().indexOf(searchTxt.toLowerCase()) >= 0)
        );
      }
      if (this.searchOption === searchOptions.SEARCH_BY_ID) {
        this.myIdeaFilterList = this.formIdea.ideas.filter(x => ("" + x.id).indexOf(searchTxt) >= 0);
      }
      if (this.searchOption === searchOptions.SEARCH_BY_AI) {
        // gọi hàm khi gõ phím enter
      }
    } else {
      this.myIdeaFilterList = this.formIdea.ideas
    }
  }
}
