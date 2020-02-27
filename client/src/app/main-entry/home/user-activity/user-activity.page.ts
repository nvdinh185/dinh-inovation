import { Component, OnInit } from '@angular/core';
import { AuthService } from 'ngxi4-dynamic-service';
import { PagerService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.page.html',
  styleUrls: ['./user-activity.page.scss'],
  providers: [PagerService]
})
export class UserActivityPage implements OnInit {
  userActions: any;
  userActionFilterArr: any;
  userNameSearch: string = '';
  pagination: any = {};
  pagedItems: any[];

  constructor(
    private apiAuth: AuthService,
    private pageService: PagerService
  ) { }

  ngOnInit() {
    this.init()
  }
  setPage(page: number) {
    // get pager object from service
    this.pagination = this.pageService.getPager(this.userActions.length, page);

    // get current page of items
    this.pagedItems = this.userActions.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
  }

  onFilterNameString(event: Event) {
    this.userNameSearch = (<HTMLInputElement>event.target).value;
    if (this.userActions.length === 0 || this.userNameSearch === '') {
      this.userActionFilterArr = this.userActions;
      this.setPage(1);
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
        this.setPage(1);
      })
      .catch(err => {
        // console.log('Lỗi: ', err);
      });
  }

}
