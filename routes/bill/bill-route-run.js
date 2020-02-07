const router = require('express').Router();

// Đối tượng xử lý lệnh post lên bởi json_data hoặc form_data
// Nếu post json thì sẽ trả về req.json_data
// Nếu post form như upload file, hoặc upload binary... 
// thì trả về req.form_data sau khi thực hiện ghi lên thưc mục ./upload_files/yyyymm/...
const postHandler = require('../../utils/post-handler');

const billHandler = require('../../handlers/bill/ebill-api-handler')

// thực hiện xác thực token user đã được cấp
const jwtTokenVerify = require('../../handlers/jwt-token-verify');

// ------ dưới đây là các hàm dành cho admin -----//

// 1. chạy phát hành thông báo cước 
// {month: yyyy-mm, period:1 or 11}
router.post('/create-bill'
    , jwtTokenVerify // nhúng xác thực token trước khi cho xử lý tiếp
    , postHandler.jsonProcess   // trả về req.json_data {month: yyyy-mm, period:1 or 11}
    // hàm lấy chuỗi json (có thể là token bảo mật) tham số lấy luôn đường dẫn
    , billHandler.createEBill   // thực thi gọi hàm và trả ngay kết quả là đang gọi hàm hoặc đang phiên trước đang chạy
    , billHandler.getSessionBill
)

// 2. tra cứu session tạo chu kỳ cước (thời gian chạy 1 kỳ cước hết 4h nên theo dõi qua hàm này sẽ cho kết quả)
router.get('/session-create-bill'
    // , jwtTokenVerify // nhúng xác thực token trước khi cho xử lý tiếp
    , billHandler.getSessionBill
)


// 3. chạy chức năng gọi nhắn tin, kết quả theo dõi ở session
// thời gian chạy ngầm của chức năng này hơn 1h nên phải theo dõi ở session
// {month: yyyy-mm, period:1 or 11}
router.post('/send-sms-all'
    , jwtTokenVerify // nhúng xác thực token trước khi cho xử lý tiếp
    , postHandler.jsonProcess    // trả về req.json_data {month: yyyy-mm, period:1 or 11}
    , billHandler.sendSmsAll
    , billHandler.getSessionSms
)

// 4. tra cứu session gửi nhắn tin lên Hà nội
router.get('/session-send-sms'
    // , jwtTokenVerify // nhúng xác thực token trước khi cho xử lý tiếp
    , billHandler.getSessionSms
)

// 5. tra cứu chu kỳ đã phát hành
// thông tin báo cáo sẽ hiển thị 
// chọn kỳ cước dạng yyyymm 
// và chọn kỳ phát hành 1 hoặc 11 
// kết quả là thống kê số lượng, tổng tiền cước
// theo loại -1 là số tiền <0 đồng,
// 0 là số tiền <5000đ
// 1 là số tiền >=5000đ phù hợp để phát hành thông báo
// get report-bill = /ebill/report-bill/201912/11
// post report-bill {month:201912,period:11}
router.post('/report-bill'
    , jwtTokenVerify // nhúng xác thực token trước khi cho xử lý tiếp
    , postHandler.jsonProcess    // trả về req.json_data
    , billHandler.getReportBill  // trả kết quả tra cứu kỳ cước đã phát hành cho client hiển thị trên web
)


// 6. tra cứu thông báo cước và link phát hành
// nhập số thuê bao, kỳ cước, trả về url_link của thuê bao đó
// json = {month, isdn}
router.post('/report-bill-isdn'
    , jwtTokenVerify                // nhúng xác thực token trước khi cho xử lý tiếp
    , postHandler.jsonProcess       // trả về req.json_data
    , billHandler.getReportBillIsdn 
    // trả về kết quả thông báo cước của một thuê bao 
    // thông tin bao gồm là cước tháng đó của khách hàng, 
    // các trạng thái khác của khách hàng như nhận thông báo giấy, ... 
)

// 7. Đăng ký nhận thông báo cước bằng giấy hoặc hủy 
// nhập số điện thoại, chọn chức năng: đăng ký nhận thông báo giấy
// hoặc chọn chức năng đăng ký chọn thông báo điện tử (tức là hủy thông báo giấy)
// post {isdn, request_status = 0 là không nhận hoặc hủy trước đó, request_status = 1 là nhận thông báo giấy}
router.post('/request-bill-report-isdn'
    , jwtTokenVerify                 // nhúng xác thực token trước khi cho xử lý tiếp
    , postHandler.jsonProcess        // trả về req.json_data { isdn, request_status }
    , billHandler.saveReportBillIsdn // Lưu thông tin đăng ký hoặc hủy nhận thông báo giấy
)

// 8. Phát hành lại đơn lẻ từng số thuê bao (gọi hàm phát hành và gửi tin nhắn đơn lẻ cho thuê bao)
// thông tin post lên gồm : { isdn, month, period }
router.post('/create-bill-isdn'
    , jwtTokenVerify                 // nhúng xác thực token trước khi cho xử lý tiếp
    , postHandler.jsonProcess        // trả về req.json_data { isdn, month, period }
    , billHandler.createReportBillIsdn // Lưu thông tin đăng ký hoặc hủy nhận thông báo giấy
)

// 9. Tra cứu thông tin phát hành hiện tại để hiển thị trên dashboard
router.get('/dashboard-report'
    // , jwtTokenVerify // nhúng xác thực token trước khi cho xử lý tiếp
    , billHandler.getDashboardReport
)

// ------- các chức năng phía trên yêu cầu phải được phân quyền và kiểm soát bởi jwt---//

module.exports = router;
