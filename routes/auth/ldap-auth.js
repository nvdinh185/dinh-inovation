const router = require('express').Router();

// handlers
const ldapHandler = require('../../handlers/admin/ldap-handler');

// Công cụ thay cho bodyParser và hơn thế nữa , xử lý cả lưu upload file theo kiểu formData
// rất tiện lợi để sử dụng các lệnh post từ client kể cả postman hoặc curl để test thử
const postHandler = require('../../utils/post-handler');

// thực hiện xác thực token user đã được cấp
const jwtTokenVerify = require('../../handlers/jwt-token-verify');

// hàm login và trả thông tin cho client biết thành công hay thất baị
router.post('/login'
    , postHandler.jsonProcess // trả về req.json_data như là req.body đã xử lý json() nhưng được kiểm soát riêng
    , ldapHandler.login       // thực hiện chức năng login bình thường
)

//
router.post('/verify-token'
    , postHandler.jsonProcess   // trả về req.json_data như là req.body đã xử lý json() nhưng được kiểm soát riêng
    , jwtTokenVerify            // kiểm tra xác thực token lấy được
    , (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(
            {
                data: req.json_data,
                user: req.user,
                header: req.headers
            }
            , (key, value) => {
                if (value === null) return undefined
                return value
            }
            , 2
        ));
    }
)

module.exports = router;