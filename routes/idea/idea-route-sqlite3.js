const router = require('express').Router();

// Đối tượng xử lý lệnh post lên bởi json_data hoặc form_data
// Nếu post json thì sẽ trả về req.json_data
// Nếu post form như upload file, hoặc upload binary... 
// thì trả về req.form_data sau khi thực hiện ghi lên thưc mục ./upload_files/yyyymm/...
const postHandler = require('../../utils/post-handler');

// trường hợp nếu sử dụng csdl oracle thì thay handler này là được
const userHandler = require('../../handlers/idea/sqlite3/user-handler-sqlite3')
const listHandler = require('../../handlers/idea/sqlite3/list-handler-sqlite3')
const ideaHandler = require('../../handlers/idea/sqlite3/idea-handler-sqlite3')

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
    , userHandler.getUserInfo       // dựa vào giá trị req.user.username trả thông tin user
)

// 2. Trang login mở ra form nhập thông tin cá nhân để tạo user mới
router.post('/create-user'
    , jwtTokenVerify                // nhúng xác thực token trước khi cho xử lý tiếp
    , postHandler.jsonProcess       // trả về req.json_data {thông tin của user}
    , userHandler.createNewUser     // tạo user mới
    , userHandler.getUserInfo       // trả thông tin user đã đăng ký
)

// 3. Sửa thông tin cá nhân (kể cả update thông tin avatar & background)
router.post('/edit-user'
    , jwtTokenVerify                // nhúng xác thực token trước khi cho xử lý tiếp
    , postHandler.jsonProcess       // trả về req.json_data {thông tin của user}
    , userHandler.editUser          // Sửa thông tin cá nhân
    , userHandler.getUserInfo       // trả thông tin user đã đăng ký
)

// ------- các chức năng phía trên yêu cầu phải được phân quyền và kiểm soát bởi jwt---//

// -- các chức năng truy vấn danh mục -----
router.get('/get-idea-parameters'
    // , jwtTokenVerify                      // xác thực token, sẽ trả về req.user.username (hoặc username - nếu khai báo trong hàm sign)
    , listHandler.getListParameters       // trả về danh mục tham số của user đang thuộc tổ chức đó
)


// -- các chức năng cho ý tưởng chính -----

// lấy các ý tưởng hiện có để hiển thị ra
router.get('/get-ideas'
    , jwtTokenVerify                      // xác thực token, sẽ trả về req.user.username (hoặc username - nếu khai báo trong hàm sign)
    , ideaHandler.getIdeas                // trả về danh sách ý tưởng
)

// tạo ý tưởng mới
router.post('/create-idea'
    , jwtTokenVerify                // nhúng xác thực token trước khi cho xử lý tiếp
    , userHandler.getUserId         // trả về req.user.id và req.user.username
    , postHandler.formProcess       // trả về req.form_data {thông tin của user}
    , ideaHandler.createIdea        // tạo idea mới
    // , ideaHandler.getIdeas          // trả thông tin idea mới
)

// sửa ý tưởng -- cập nhập trạng thái ...
router.post('/edit-idea'
    , jwtTokenVerify                // nhúng xác thực token trước khi cho xử lý tiếp
    , postHandler.formProcess       // trả về req.json_data {thông tin của idea}
    , ideaHandler.editIdea          // sửa idea mới
    // , ideaHandler.getIdeas       // trả thông tin idea
)



// lấy chỉ tiết một ý tưởng để tương tác
router.get('/get-idea'
    , jwtTokenVerify                      // xác thực token, sẽ trả về req.user.username (hoặc username - nếu khai báo trong hàm sign)
    , ideaHandler.getIdea                // trả về chi tiết của ý tưởng đó
)


// like ý tưởng
router.post('/like-idea'
    , jwtTokenVerify                // nhúng xác thực token trước khi cho xử lý tiếp
    , userHandler.getUserId         // trả về req.user.id và req.user.username
    , postHandler.jsonProcess       // trả về req.json_data {thông tin của idea}
    , ideaHandler.likeIdea          // like idea trả về req.ideaId
    , ideaHandler.getIdea           // trả thông tin idea
)

// comment ý tưởng
router.post('/comment-idea'
    , jwtTokenVerify                // nhúng xác thực token trước khi cho xử lý tiếp
    , userHandler.getUserId         // trả về req.user.id và req.user.username
    , postHandler.formProcess       // trả về req.form_data {thông tin của idea}
    , ideaHandler.commentIdea       // comment idea
    , ideaHandler.getIdea           // trả thông tin idea
)


// thống kê hoạt động thường xuyên đưa vào tôn vinh
router.get('/get-top-actions'
    // , jwtTokenVerify                      // xác thực token, sẽ trả về req.user.username (hoặc username - nếu khai báo trong hàm sign)
    , listHandler.getActionsList             // trả về danh sách ý tưởng
)

// get file id array ?id_list=[1,2,3,4]
router.get('/get-attach-files'
    , jwtTokenVerify                      // xác thực token, sẽ trả về req.user.username (hoặc username - nếu khai báo trong hàm sign)
    , listHandler.getIdeasAttachs            // trả về danh sách tên file đường dẫn cần lấy
)

// đọc dữ liệu 1 file trả kết quả về client mở file ra
router.get('/get-file-id'
    // , jwtTokenVerify                      // xác thực token, sẽ trả về req.user.username (hoặc username - nếu khai báo trong hàm sign)
    , listHandler.getFileAttach              // trả về dữ liệu file thực tế
)


module.exports = router;
