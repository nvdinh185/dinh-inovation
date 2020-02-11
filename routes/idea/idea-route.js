const router = require('express').Router();

// Đối tượng xử lý lệnh post lên bởi json_data hoặc form_data
// Nếu post json thì sẽ trả về req.json_data
// Nếu post form như upload file, hoặc upload binary... 
// thì trả về req.form_data sau khi thực hiện ghi lên thưc mục ./upload_files/yyyymm/...
const postHandler = require('../../utils/post-handler');

const ideaHandler = require('../../handlers/idea/idea-handler')

// thực hiện xác thực token user đã được cấp
const jwtTokenVerify = require('../../handlers/jwt-token-verify');

// ------ dưới đây là các hàm dành cho admin -----//
// 1. Sau khi login xong thành công, nếu chưa có thông tin trong hệ thống
// thì người dùng sẽ được hiển thị form yêu cầu điền thông tin cá nhân lên hệ thống
router.post('/create-user'
    , jwtTokenVerify            // nhúng xác thực token trước khi cho xử lý tiếp
    , postHandler.jsonProcess   // trả về req.json_data {thông tin của user}
    , ideaHandler.createUser    // 
)

// ------- các chức năng phía trên yêu cầu phải được phân quyền và kiểm soát bởi jwt---//

module.exports = router;
