const router = require('express').Router();
const LoginHandler = require('../../handlers/admin/login-handler');
const postHandler = require('../../utils/post-handler');
const userHandler = require('../../handlers/idea/user-handler-sqlite3');
// thực hiện xác thực token user đã được cấp
const jwtTokenVerify = require('../../utils/jwt-token-verify');
// kiểm tra quyền
const checkRight = require('../../utils/check-right');

// Các đường dẫn tương tác với csdl users
router.get('/get-user-info'
    , jwtTokenVerify
    , checkRight
    , userHandler.getUserInfo
)

router.post('/create-user'
    , jwtTokenVerify
    , postHandler.jsonProcess
    , userHandler.createNewUser
    , userHandler.getUserInfo
)

router.post('/edit-user'
    , jwtTokenVerify
    , checkRight
    , postHandler.jsonProcess
    , userHandler.editUser
    , userHandler.getUserInfo
)

router.post('/login'
    , postHandler.jsonProcess
    , LoginHandler.login
)

module.exports = router;