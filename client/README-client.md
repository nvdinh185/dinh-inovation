## Đây là client IONIC4 - angular 8

# Để dịch ra ./client/www ta dùng lệnh này
``` sh
# Lưu ý nếu muốn thay đổi đường dẫn gốc thì thay ở file index.html `/` bằng `/m-inovation/` trước khi dịch
ionic build browser --prod base-href=/m-inovation/
# or + --service-worker --base-href /m-inovation/
ionic build --prod
```

# Để chạy test thử trên máy local port 8100-->
``` sh
ionic serve
```


### Để cài trên ios thì chạy lệnh sau
```sh
#thuc hien build IOS,
#npm i
# Cach 1: ----- bien dich va chay tren xcode for debug -----
ionic cordova plugin save
ionic cordova platform remove ios
ionic cordova platform add ios --save
#ionic 4 them lenh nay lấy tham số prod trong biến môi trường nhé
ionic cordova prepare ios --prod

# Mở xcode chọn <project_name>.xcodeproj trong thư mục ./flatforms/ios
#File --> Project settings --> Build system = Legacy Build System
#project navigator -> select <project name> --> targets --> select <projectname> 
#in tab General --> go to row: signing --> select team --> add account registered with apple for deverloper
# run build and install in ios


# Cach 2: chay truc tiep thuong bi loi thi build voi tham so sau
#ionic cordova run ios -c

# Cach 3: Build tranh loi xay ra o cach 2
#ionic cordova build ios -- --buildFlag="-UseModernBuildSystem=0"
#OK ionic 3&4
ionic cordova run ios -- --buildFlag="-UseModernBuildSystem=0"
#ionic cordova run ios --prod --buildFlag="-UseModernBuildSystem=0"
```


### Để cài cho android chạy lệnh sau
```sh
ionic cordova plugin save
ionic cordova platform remove android
ionic cordova platform add android --save

#ionic 4
ionic cordova prepare android --prod
#Lệnh Build (prepare + compile) an Ionic project for a given platform
ionic cordova build android --prod --release

ionic cordova run android -l

# ionic cordova run android --device

#1. build --> release android 24.0 chay tren may win
#ionic cordova build android --prod --release

#2. -->get file: <app>\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
# -->copy to ./build to sign --> remame to: ./build/speedtest-app-unsigned.apk

# default lenh de go ngan gon
#export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/Users/cuongdq/Library/Android/sdk/platform-tools:/Users/cuongdq/Library/Android/sdk/tools:/Users/cuongdq/Library/Android/sdk/platform-tools:/Users/cuongdq/Library/Android/sdk/tools:/Users/cuongdq/Library/Android/sdk/build-tools/28.0.3/

#3. use keytool create key pair for sign 4year=365*4+1 chay tren may win/mac:
# keytool -genkey -v -keystore ./build/speedtest-app-key.keystore -alias speedtest-app-alias -keyalg RSA -keysize 2048 -validity 1461
# -->get file ./build/cng-release-key.keystore with pass when type

#4. jarsigner sign apk file chay tren may mac:
# jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./build/speedtest-app-key.keystore ./build/speedtest-app-unsigned.apk speedtest-app-alias

#5. zipalign align file apk: kiem tra echo $ANDROID_HOME cd den build-tools... chay tren mac
#  zipalign -v 4 ./build/speedtest-app-unsigned.apk ./build/speedtest-app.apk

#6. upload into playstore


#ví dụ các lệnh sau:

ionic cordova build android
ionic cordova build android --buildConfig=build.json
ionic cordova build android --prod --release -- -- --gradleArg=-PcdvBuildMultipleApks=true
ionic cordova build android --prod --release -- -- --keystore=filename.keystore --alias=myalias
ionic cordova build android --prod --release -- -- --minSdkVersion=21
ionic cordova build android --prod --release -- -- --versionCode=55
ionic cordova build android --prod --release --buildConfig=build.json
ionic cordova build ios
ionic cordova build ios --buildConfig=build.json
ionic cordova build ios --prod --release
ionic cordova build ios --prod --release -- --developmentTeam="ABCD" --codeSignIdentity="iPhone Developer" --packageType="app-store"
ionic cordova build ios --prod --release --buildConfig=build.json
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