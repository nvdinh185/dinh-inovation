import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.page.html',
  styleUrls: ['./idea.page.scss'],
})
export class IdeaPage implements OnInit {

  formIdea: any = {
    title: 'Ý tưởng'
  }

  isCardNewShow: false;

  constructor() { }

  ngOnInit() {
  }

  // form nhập liệu này
  dynamicFormInput: any = JSON.stringify({ // Form mẫu hiển thị nhập liệu tạo đối tượng jon_data
    okButton: { icon: "save", name: "Ý tưởng mới của bạn là gì?", color: "secondary", next: "CALLBACK", command: "ADD" }
    ,
    cancelButton: { icon: "close", next: "CLOSE" }
    ,
    items: [
      // Danh sách các trường nhập liệu
      { type: "text", key: "name", name: "Tên hiển thị(*)", hint: "Nhập tên hiển thị trên list", input_type: "text", icon: "information-circle", validators: [{ required: true }] }
      , { type: "text", key: "value", name: "giá trị", hint: "Nhập tên giá trị", input_type: "number", icon: "information-circle" }
      , { type: "image", key: "image", name: "Ảnh hiển thị", hint: "Chọn ảnh" }
    ]
  })

  // giá trị mặc định
  dynamicFormValue: any = JSON.stringify(
    {
      name: 'Dccc',
      value: '122'
    }
  )

  // hàm gọi lại xử lý ajax
  dynamicCallback(ajaxItem) {
    return new Promise(resolve => {
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


}
