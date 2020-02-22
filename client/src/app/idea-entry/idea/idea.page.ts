import { Component, OnInit } from '@angular/core';
import { CommonsService, AuthService, DynamicFormMobilePage } from 'ngxi4-dynamic-service';
import { MainService } from 'src/app/services/main.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  // danh sách ý tưởng

  dynamicFormInput: string;
  dynamicFormValue: string;
  dynamicCallback: any;


  isCardNewShow: boolean = false;

  userInfo: any;

  constructor(
    private router: Router
    , private apiAuth: AuthService
    , private mainService: MainService
    , private modalController: ModalController
  ) { }

  ngOnInit() {
    this.init();
    this.refresh();
  }


  async init() {
    // lấy thông tin user đang login có chưa?
    this.userInfo = this.mainService.getUserInfo();

    try {
      this.parameters = await this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea-parameters', true)
    } catch{ }

    let categoryOptions = this.parameters && this.parameters.ideas_categories ? this.parameters.ideas_categories : [];

    let statusOptions = this.parameters && this.parameters.ideas_statuses ? this.parameters.ideas_statuses : [];

    // form nhập liệu này
    this.dynamicFormInput = JSON.stringify({ // Form mẫu hiển thị nhập liệu tạo đối tượng jon_data
      okButton: { icon: "save", name: "Ý tưởng mới của bạn là gì?", color: "secondary", next: "CALLBACK", command: "ADD",  url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/create-idea', type: "FORM-DATA", token: true }
      ,
      cancelButton: { icon: "close", next: "CLOSE" }
      ,
      items: [
        // Danh sách các trường nhập liệu
        { type: "text", key: "title", name: "Chủ đề là gì? ", hint: "Nhập chủ đề của ý tưởng này từ 5-200 ký tự", input_type: "text", icon: "md-help", validators: [{ required: true, min: 5, max: 200 }] }
        , { type: "text_area", key: "description", name: "Mô tả nội dung ý tưởng của bạn từ 50 đến 1000 từ", hint: "Nhập mô tả ý tưởng của bạn", input_type: "text", icon: "md-information-circle", validators: [{ required: true, min: 10 }] }
        , { type: "select", key: "category_id", name: "Phân loại ý tưởng?", icon: "contrast", options: categoryOptions, color: "warning" }
        , { type: "select", key: "status", name: "Trạng thái của ý tưởng?", icon: "clock", options: statusOptions, color: "secondary" }
        , { type: "upload-files", name: "Chọn file", multiple: "single", accept:`image/gif, image/jpeg, image/png`}
      ]
    })

    // giá trị mặc định
    this.dynamicFormValue = JSON.stringify(
      {
        title: '',
        description: '',
        category_id: '' + (categoryOptions.find(x => x.is_default === 1) ? categoryOptions.find(x => x.is_default === 1).id : 2),
        status: '' + (statusOptions.find(x => x.is_default === 1) ? statusOptions.find(x => x.is_default === 1).id : 2)
      }
    )

    this.dynamicCallback = this.dynamicCallbackCard;

  }

  async refresh() {
    // lấy danh sách ý tưởng từ csdl mới nhất
    try {
      this.formIdea.ideas = await this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-ideas', true)
      if (Array.isArray(this.formIdea.ideas)) {
        this.formIdea.ideas.forEach(el => {
          if (el.voted_users && el.voted_users.find(x => x === this.userInfo.id)) el.isUserVoted = true;
          if (el.commented_users && el.commented_users.find(x => x === this.userInfo.id)) el.isUserCommented = true;
        });
      }
    } catch{ }
    // Đã có danh sách ý tưởng mới lấy được từ csdl rồi
  }

  // hàm gọi lại xử lý ajax
  dynamicCallbackCard(ajaxItem) {
    return new Promise(resolve => {

      // console.log(ajaxItem);

      let ajaxReturn = {
        key: 'name',
        property_name: 'value',
        new_data: 'Tên mới thay đổi từ ajax'
      }
      // or 
      // ajaxReturns = [{...ajaxReturn}]
      resolve(ajaxReturn);
    })
  }

  // hàm trả kết quả của form nhập mới ý tưởng
  onSelectedFinish(evt) {
    // this.formIdea.ideas = evt && evt.response_data ? evt.response_data : this.formIdea.ideas;
    this.refresh();        // làm mới ý tưởng mới
    this.isCardNewShow = false;
  }


  // thêm mới ý tưởng
  onClickAddNew() {
    this.isCardNewShow = true;
  }


  // Đọc lại các ý tưởng mới
  doRefresh(evt) {
    setTimeout(() => {
      this.refresh();        // làm mới ý tưởng mới
      evt.target.complete();
    }, 1000);
  }

  // sự kiện bấm ở card ý tưởng
  // có mấy tình huống sinh ra bằng command
  onClickIdeaCard(evt) {
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
    this.router.navigate(['/idea-detail'], { queryParams: {id:item.id} });

  }


  // Người dùng bấm nút like
  // Gửi lên máy chủ lệnh like từ token này
  likeIdea(item) {
    // id và token chứa user like id này
    this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/like-idea', { id: item.id }, true)
      .then(newIdea => {
        // console.log(newIdea);
        this.refresh(); // làm mới ý tưởng mới
      })
      .catch(err => console.log(err))
  }

  // người dùng bấm nút comment
  commentIdea(item) {
    this.router.navigate(['/idea-detail'], { queryParams: {id:item.id} });
  }


  async openModal(componentPage, navParams) {
    const myModal = await this.modalController.create({
      component: componentPage,
      componentProps: navParams,
      cssClass: 'cng-custom-modal-css'
    });
    return await myModal.present();
  }
}
