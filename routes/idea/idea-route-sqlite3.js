const router = require('express').Router();

// Đối tượng xử lý lệnh post lên bởi json_data hoặc form_data
// Nếu post json thì sẽ trả về req.json_data
// Nếu post form như upload file, hoặc upload binary... 
// thì trả về req.form_data sau khi thực hiện ghi lên thưc mục ./upload_files/yyyymm/...
const postHandler = require('../../utils/post-handler');

// trường hợp nếu sử dụng csdl oracle thì thay handler này là được
const ideaHandler = require('../../handlers/idea/idea-handler-sqlite3')

// thực hiện xác thực token user đã được cấp
const jwtTokenVerify = require('../../handlers/jwt-token-verify');

// ------ dưới đây là các hàm dành cho admin -----//
// 1. Sau khi người dùng login thành công, hàm này trả về thông tin user trong hệ thống
// trường hợp chưa có user hoặc user đang bị khóa thì trả về 2 trạng thái, user đang bị khóa
// và trường hợp user chưa có thì yêu cầu bật form khai báo thông tin
// {status:'OK', message:'Login thành công', data: userInfo}
// trường hợp userInfo không có dữ liệu thì phải yêu cầu khai báo form user
// hoặc {status:'NOK', message:'User bị khóa liên hệ Quản trị hệ thống'}
router.get('/get-user-info'
    , jwtTokenVerify                // xác thực token, sẽ trả về req.user.username (hoặc username - nếu khai báo trong hàm sign)
    , ideaHandler.getUserInfo       // dựa vào giá trị req.user.username trả thông tin user
)

// 2. Trang login mở ra form nhập thông tin cá nhân để tạo user mới
router.post('/create-user'
    , jwtTokenVerify                // nhúng xác thực token trước khi cho xử lý tiếp
    , postHandler.jsonProcess       // trả về req.json_data {thông tin của user}
    , ideaHandler.createNewUser     // tạo user mới
    , ideaHandler.getUserInfo       // trả thông tin user đã đăng ký
)

// 3. Sửa thông tin cá nhân (kể cả update thông tin avatar & background)
router.post('/edit-user'
    , jwtTokenVerify                // nhúng xác thực token trước khi cho xử lý tiếp
    , postHandler.jsonProcess       // trả về req.json_data {thông tin của user}
    , ideaHandler.editUser          // Sửa thông tin cá nhân
    , ideaHandler.getUserInfo       // trả thông tin user đã đăng ký
)

// ------- các chức năng phía trên yêu cầu phải được phân quyền và kiểm soát bởi jwt---//

module.exports = router;
