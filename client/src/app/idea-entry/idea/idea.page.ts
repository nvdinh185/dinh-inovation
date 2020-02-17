import { Component, OnInit } from '@angular/core';
import { CommonsService, AuthService } from 'ngxi4-dynamic-service';
import { MainService } from 'src/app/services/main.service';

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

  constructor(
    private apiCommons: CommonsService
    , private apiAuth: AuthService
    , private mainService: MainService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    try {
      this.parameters = await this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea-parameters', true)
    } catch{ }

    let categoryOptions = this.parameters && this.parameters.ideas_categories ? this.parameters.ideas_categories : [];

    let statusOptions = this.parameters && this.parameters.ideas_statuses ? this.parameters.ideas_statuses : [];

    // form nhập liệu này
    this.dynamicFormInput = JSON.stringify({ // Form mẫu hiển thị nhập liệu tạo đối tượng jon_data
      okButton: { icon: "save", name: "Ý tưởng mới của bạn là gì?", color: "secondary", next: "CALLBACK", command: "ADD", url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/create-idea', token: true }
      ,
      cancelButton: { icon: "close", next: "CLOSE" }
      ,
      items: [
        // Danh sách các trường nhập liệu
        { type: "text", key: "title", name: "Chủ đề", hint: "Nhập chủ đề của ý tưởng này từ 5-200 ký tự", input_type: "text", icon: "md-help", validators: [{ required: true, min: 5, max: 200 }] }
        , { type: "text_area", key: "description", name: "Mô tả nội dung ý tưởng của bạn từ 50 đến 1000 từ", hint: "Nhập mô tả ý tưởng của bạn", input_type: "text", icon: "md-information-circle", validators: [{ required: true, min: 10 }] }
        , { type: "select", key: "category_id", name: "Phân loại ý tưởng?", icon: "contrast", options: categoryOptions, color: "warning" }
        , { type: "select", key: "status", name: "Trạng thái của ý tưởng?", icon: "clock", options: statusOptions, color: "secondary" }
        // , { type: "image", key: "logo", name: "Chọn ảnh đại diện?"}
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

    try {
      this.formIdea.ideas = await this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-ideas')
    } catch{ }

    // Đã có danh sách ý tưởng mới lấy được từ csdl rồi

  }

  // hàm gọi lại xử lý ajax
  dynamicCallbackCard(ajaxItem) {
    return new Promise(resolve => {

      console.log(ajaxItem);

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

  // hàm trả kết quả của forrm
  onSelectedFinish(evt) {
    console.log('trả kết quả', evt);
    this.isCardNewShow = false;
  }


  // thêm mới ý tưởng
  onClickAddNew() {
    console.log('onlick');

    this.isCardNewShow = true;
  }


  // Đọc lại các ý tưởng mới
  doRefresh(evt){
    setTimeout(() => {
      evt.target.complete();
    }, 1000);
  }

  // sự kiện bấm ở card ý tưởng
  onClickIdeaCard(evt){

  }

}
