/**
 * Thực hiện cấu hình cho phép truy cập hạn chế
 * Không cho phép sử dụng máy quét mật khẩu, keycode ... 
 * Tối đa cho phép trong 30 giây chỉ được phép truy vấn hạn chế lượt truy cập từ 1 ip và 1 đường dẫn
 */

const DDDoS = require('dddos');
module.exports = new DDDoS({
    errorData: "Xin vui lòng không cố truy vấn liên tục. Hãy bình tĩnh và đợi sau 1 phút nhé!",  //tin hiển thị mà client nhận được
    //Data to be passes to the client on DDoS detection. Default: "Not so fast!".
    errorCode: 429,      //mã lỗi mà client nhận được
    //HTTP error code to be set on DDoS detection. Default: 429 (Too Many Requests)
    // weight: 1,           //bước nhảy trọng lượng là 1   
    // maxWeight: 60,       //tối đa cho 40 phiên/giây
    checkInterval: 30000,   // tần suất kiểm tra là 30 giây
    rules: [
        { // 1. Cho phép trang login tối đa truy vấn trong 30 giây được 1 phiên
            string: '/m-inovation/api/auth/login',
            maxWeight: 5
        }
        ,
        { // 2. Cho phép kiểm tra token chỉ truy vấn 30 giây một lần
            string: '/m-inovation/api/auth/verify-token',
            maxWeight: 5
        }
        ,
        { // 3. Đường dẫn truy vấn thông báo cước điện tử của khách hàng chỉ cho phép 1 phiên trên 30 giây
            regexp: "^/m-inovation/mf3/*",    // Đường dẫn truy vấn thông báo cước điện tử từ khách hàng
            maxWeight: 2                // chỉ cho phép n phiên trong khoảng interval
        }
        ,
        { // 3. cho phep trang có gửi tin nhắn được phép checkInterval 1 tin thôi
            regexp: "^/m-inovation/api/*",    // Các đường dẫn tưong tự
            flags: "i",                 // không phân biệt chữ hoa, thường 
            maxWeight: 10,               // chỉ cho phép n phiên trong khoảng interval
            queueSize: 5                // Nếu truy vấn trong khoảng checkInterval thì đưa vào hàng đợi (delay)
            // client sẽ không thấy kết quả trả về mà chờ thời gian checkInterval mới trả về kết quả nhé
        }
        ,
        //cho phép tất cả các đường dẫn còn lại tối đa là 16 phiên/30 giây
        { // Allow up to 16 other requests per check interval.
            regexp: ".*",
            maxWeight: 16
        }
    ]
})
    ;
