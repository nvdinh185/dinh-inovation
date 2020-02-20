## Đây là client IONIC4 - angular 8

# Để dịch ra ./client/www ta dùng lệnh này
``` sh
# Lưu ý nếu muốn thay đổi đường dẫn gốc thì thay ở file index.html `/` bằng `/m-inovation/` trước khi dịch
ionic build browser --prod base-href=/m-inovation/
# or
ionic build --prod --service-worker --base-href /m-inovation/
```

# Để chạy test thử trên máy local port 8100-->
``` sh
ionic serve
```

# 4. Tạo trang mới:
# xem lệnh tạo trang, thành phần, thuộc tính, dịch vụ...

# Lệnh tạo trang (Page) trong thư mục lists có tên là JobRolesPage
``` sh
ionic g page lists/JobRoles
```

# Lệnh tạo thành phần thẻ (Component) trong thư mục components là PopoverCard
``` sh
ionic g component components/PopoverCard
ionic g component components/CameraCard

ionic generate
ionic generate page
ionic generate component contact/form
ionic generate component login-form --change-detection=OnPush
ionic generate directive ripple --skip-import
ionic generate service api/user
```

# Bị lỗi khi chạy `ionic serve` trên win thì chạy lệnh sau:
``` sh
# Kiểm tra version của angular
ng version
# Downgrade build để ko phát sinh lỗi (xem trong package.json)
npm i @angular-devkit/build-angular@0.803.24
```

# Post dữ liệu giữa các trang trong IONIC4:
```ts
// Tại trang gốc cần chuyển đến trang sau
import { Router } from '@angular/router';
export class MyPage implements OnInit {
    constructor(
        ...
        , private router: Router
    ) { }

    // hàm sự kiện cần chuyển
    myEvent(item:any){
        // trong đó item là một object = {}
        // Chuyển tham số kiểu queryParams --> { queryParams: { page: pageNum } }
        this.router.navigate(['/list'], { queryParams: item });
    }
}


// Tại trang nhận nó sẽ khai báo như này
import { ActivatedRoute } from '@angular/router';
export class MyDetailPage implements OnInit {
     constructor(
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      console.log('Nhận tham số từ this.router.navigate(["/list"], { queryParams: objectOptions });', data);
    });
  }
}
```