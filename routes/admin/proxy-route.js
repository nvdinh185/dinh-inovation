/**
 * ver 1.0 21/11/2019
 * Đường dẫn proxy giống như của auth
 * nhưng dữ liệu và token sẽ nhờ auth
 * 
 */
const router = require('express').Router();

const postHandler = require('../../utils/post-handler');

const proxyHandler = require('../../handlers/admin/proxy-handler');

// 1. Yêu cầu một username --> 3 trường hợp 
// + 1. lỗi thông báo chờ hoặc nhập lại user khác
// + 2. chưa có user trả về token + captcha yêu cầu nhập pass, user info --trả về userinfo
// + 3. đã có user trả về token + captcha + yêu cầu nhập pass để trả userinfo
//xác thực username
router.post('/request-username'
, postHandler.jsonProcess //req.json_data
, proxyHandler.requestUserName //trả về token và captcha chứa otp
, proxyHandler.forward2Server // chuyển 
);


// 2. Người dùng mới nhận được token + captcha + status = "NEW-USER or LOGIN-USER"
// + nhập pass mới gửi lên sẽ tạo user nếu xác thực đúng
router.post('/create-username'
, postHandler.jsonProcess //req.json_data chứa [token,] otp, password
, proxyHandler.getToken //req.token + req.otp + req.proxy
, proxyHandler.createUserName //return req.user.data from db
, proxyHandler.forward2Server // chuyển 
);

// 3. Người dùng thực hiện login bằng mật khẩu và otp
// login-username
router.post('/login-username'
, postHandler.jsonProcess //req.json_data chứa [token,] otp, password
, proxyHandler.getToken //req.token + req.otp + req.proxy
, proxyHandler.loginUserName //return req.user.data from db
, proxyHandler.forward2Server // chuyển 
);


// 4. xác thực token --> trả về user_info.username và user_info.data
router.post('/authorize-token'
, postHandler.jsonProcess     //req.json_data
, proxyHandler.getToken       //req.token + req.otp + req.proxy
, proxyHandler.authorizeToken //return req.user.data from db
, proxyHandler.forward2Server // chuyển 
);

// 4.1 xác thực token --> trả về user_info.username và user_info.data
router.get('/authorize-token'
, proxyHandler.getToken //req.token + req.otp + req.proxy từ req.paramS
, proxyHandler.authorizeToken //return req.user.data from db
, proxyHandler.forward2Server // chuyển 
);

// 5. Sửa thông tin người dùng
router.post('/edit-username'
, postHandler.jsonProcess       //  req.json_data chứa [token,] otp, password
, proxyHandler.getToken         //  req.token + req.otp + req.proxy
, proxyHandler.editUserName     //  return req.user.data from db
, proxyHandler.forward2Server   // chuyển 
);

// Lấy thông tin người dùng để đồng bộ về hệ thống quản trị thông tin người dùng
// Nếu người dùng có thay đổi thông tin trên hệ thống xác thực /auth
router.get('/get-users-info'
, proxyHandler.getToken         // tra ve req.token neu co
, proxyHandler.getUsersInfo     // chuyen doi du lieu req.paramS sang
, proxyHandler.forward2Server   // gui lenh len may chu thuc
);

// trả về thông tin người dùng
// sử dụng cho proxy
router.post('/get-user-info'
, postHandler.jsonProcess       // req.json_data chứa token, username, proxy (cert của proxy)
, proxyHandler.getToken         // tra ve req.token neu co
, proxyHandler.getUserInfo
, proxyHandler.forward2Server // chuyển 
);     // trả về user có trong db
        
module.exports = router;