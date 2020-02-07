const router = require('express').Router();

// handlers
const postHandler = require('../../utils/post-handler');
const billHandler = require('../../handlers/bill/ebill-handler');

// middlewares
const jwtTokenVerify = require('../../handlers/jwt-token-verify');

// ------ dưới đây là các hàm dành cho admin -----//

// chạy phát hành thông báo cước 
router.post('/create-bill/:month/:period'
  , jwtTokenVerify
  , postHandler.jsonProcess   // hàm lấy chuỗi json (có thể là token bảo mật) tham số lấy luôn đường dẫn
  , billHandler.createEBill   // thực thi gọi hàm và trả ngay kết quả là đang gọi hàm hoặc đang phiên trước đang chạy    
)

// tra cứu session tạo chu kỳ cước (thời gian chạy 1 kỳ cước hết 4h nên theo dõi qua hàm này sẽ cho kết quả)
router.get('/session-create-bill'
  , jwtTokenVerify
  , billHandler.getSessionBill
)

// chạy chức năng gọi nhắn tin, kết quả theo dõi ở session
// thời gian chạy ngầm của chức năng này hơn 1h nên phải theo dõi ở session
router.get('/send-sms/:month/:period'
  , jwtTokenVerify
  , billHandler.sendSms
  , billHandler.getSessionSms
)

// tra cứu session gửi nhắn tin lên Hà nội
router.get('/session-send-sms'
  , jwtTokenVerify
  , billHandler.getSessionSms
)

// tra cứu chu kỳ đã phát hành
// thông tin báo cáo sẽ hiển thị 
// chọn kỳ cước dạng yyyymm 
// và chọn kỳ phát hành 1 hoặc 11 
// kết quả là thống kê số lượng, tổng tiền cước
// theo loại -1 là số tiền <0 đồng,
// 0 là số tiền <5000đ
// 1 là số tiền >=5000đ phù hợp để phát hành thông báo
// get report-bill = /ebill/report-bill/201912/11
router.get('/report-bill/:month/:period'
  , jwtTokenVerify
  , billHandler.getReportBill
)


// 1. thêm 1 hàm là tra cứu link của 1 thuê bao
// nhập số thuê bao, kỳ cước, trả về url_link của thuê bao đó
router.get('/report-bill-isdn/:isdn/:month'
  , jwtTokenVerify
  , billHandler.getReportBillIsdn
)


// 2. thêm 1 hàm đăng ký nhận thông báo giấy 
// n

module.exports = router;