const router = require('express').Router();

const postHandler = require('../../utils/post-handler');

const userHandler = require('../../handlers/admin/user-handler');
const tokenHandler = require('../../handlers/admin/token-handler');
const captchaHandler = require('../../handlers/captcha-handler');

// 1. Yêu cầu một username --> 3 trường hợp 
// + 1. lỗi thông báo chờ hoặc nhập lại user khác
// + 2. chưa có user trả về token + captcha yêu cầu nhập pass, user info --trả về userinfo
// + 3. đã có user trả về token + captcha + yêu cầu nhập pass để trả userinfo
//xác thực username
router.post('/request-username'
, postHandler.jsonProcess //req.json_data
, userHandler.requestUsername //req.username hoặc thông báo ngay
, captchaHandler.createCaptcha //req.captcha
, tokenHandler.requestNewToken //trả về token và captcha chứa otp
);


// 2. Người dùng mới nhận được token + captcha + status = "NEW-USER or LOGIN-USER"
// + nhập pass mới gửi lên sẽ tạo user nếu xác thực đúng
router.post('/create-username'
, postHandler.jsonProcess //req.json_data chứa [token,] otp, password
, tokenHandler.getToken //req.token + req.otp + req.proxy
, tokenHandler.verify   //req.user or req.error
, userHandler.requestUsername //req.username + req.next_status = NEW-USER or LOGIN-USER
, userHandler.createUsername //thực hiện tạo user bởi username và pass gửi lên, req.username & req.user
, tokenHandler.createToken365 //tạo ra req.token
, userHandler.getUserInfo //return req.user.data from db
);

// 3. Người dùng thực hiện login bằng mật khẩu và otp
// login-username
router.post('/login-username'
, postHandler.jsonProcess //req.json_data chứa [token,] otp, password
, tokenHandler.getToken //req.token + req.otp + req.proxy
, tokenHandler.verify   //req.user or req.error
, userHandler.requestUsername //req.username + req.next_status = NEW-USER or LOGIN-USER
, userHandler.loginUsername //thực hiện kiểm tra mật khẩu username và pass gửi lên, --> req.hash_pass
, tokenHandler.createToken365 //tạo ra req.token
, userHandler.getUserInfo //return req.user.data from db
);


// 4. xác thực token --> trả về user_info.username và user_info.data
router.post('/authorize-token'
, postHandler.jsonProcess //req.json_data
, tokenHandler.getToken //req.token + req.otp + req.proxy
, tokenHandler.verify   //req.user or req.error = message
, userHandler.getUserInfo //return req.user.data from db
);

// 4.1 xác thực token --> trả về user_info.username và user_info.data
router.get('/authorize-token'
, tokenHandler.getToken //req.token + req.otp + req.proxy từ req.paramS
, tokenHandler.verify   //req.user or req.error = message
, userHandler.getUserInfo //return req.user.data from db
);

// 5. Sửa thông tin người dùng
router.post('/edit-username'
, postHandler.jsonProcess //req.json_data chứa [token,] otp, password
, tokenHandler.getToken //req.token + req.otp + req.proxy
, tokenHandler.verify   //req.user or req.error
, userHandler.requestUsername //req.username + req.next_status = LOGIN-USER
, userHandler.createUsername //thực hiện sửa user bởi req.username & req.user
, userHandler.getUserInfo //return req.user.data from db
);

// Trả về captcha hình ảnh
router.get('/captcha'
, captchaHandler.createCaptcha // tạo ra req.captcha.text và req.captcha.data dạng svg
, captchaHandler.getCaptcha    //trả svg để hiển thị yêu cầu người dùng xác nhận
);

// Khi đẩy lên là json nhập liệu + token để verify
router.get('/captcha-token'
, captchaHandler.createCaptcha    // tạo ra req.captcha.text và req.captcha.data dạng svg
, tokenHandler.createTokenCaptcha // trả về token + svg 
);

// Lấy public-key của hệ thống để kiểm tra chữ ký
router.get('/system-id'
, userHandler.getSystemId //Đưa về id là public key nhé, để mã hóa hoặc chứng thực
);

// Lấy thông tin người dùng để đồng bộ về hệ thống quản trị thông tin người dùng
// Nếu người dùng có thay đổi thông tin trên hệ thống xác thực /auth
router.get('/get-users-info'
, tokenHandler.getToken         // tra ve req.token neu co
, tokenHandler.verify           // xac thuc tra ve req.user neu co
, userHandler.getUsersInfo
);

// trả về thông tin người dùng
// sử dụng cho proxy
router.post('/get-user-info'
, postHandler.jsonProcess       // req.json_data chứa token, username, proxy (cert của proxy)
, tokenHandler.getToken         // tra ve req.token neu co
, tokenHandler.verify           // xac thuc tra ve req.user neu co
// xác thực proxy server có được cấp quyền ko? (nó có một cert được server này chứng thực bằng private key)
// đảo req.user = {username:req.json_data.username}
, userHandler.getUserInfo
);     // trả về user có trong db
        
module.exports = router;