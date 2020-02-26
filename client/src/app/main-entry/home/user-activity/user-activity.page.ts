import { Component, OnInit } from '@angular/core';
import { AuthService } from 'ngxi4-dynamic-service';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.page.html',
  styleUrls: ['./user-activity.page.scss'],
})
export class UserActivityPage implements OnInit {
  userActions: any;
  userActionFilterArr: any;
  userNameSearch:string = '';
  
  constructor(
    private apiAuth: AuthService
  ) {}

  ngOnInit() {
    this.init()
  }

  onFilterNameString(event: Event) {
    this.userNameSearch = (<HTMLInputElement>event.target).value;
    if(this.userActions.length === 0 || this.userNameSearch === '') {
      this.userActionFilterArr = this.userActions;
      // console.log(this.userActionFilterArr)
    } else {
      const resultArray = []
      for (const item of this.userActions) {
        if (item.fullname.toLowerCase().includes(this.userNameSearch.toLowerCase())) {
          resultArray.push(item);
        }
      }
      this.userActionFilterArr = resultArray;
    }
  }
  
  init() {
    this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-top-actions")
      .then(data => {
        console.log('Data: ', data);
        this.userActions = data;
        this.userActionFilterArr = data;
      })
      .catch(err => {
        // console.log('Lỗi: ', err);
      });
  }

}
