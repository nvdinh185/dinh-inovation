const router = require('express').Router();

const postHandler = require('../../utils/post-handler');

const chatbotHandler = require('../../handlers/chatbot/chatbot-fasttext-handler');

const upgradeIdeaHandler = require("../../handlers/upgrade-database/upgrade-bot-handler");

// Gửi lên thử một câu yêu cầu
// trả về mảng dự đoán xác xuất cho nó 3 mệnh đề
// dùng để test thử câu để tìm xác suất dự đoán
router.get('/get-predict'
    , chatbotHandler.getFastTextPredict
)

// lấy dữ liệu huấn luyện
router.get('/get-trains'
    , chatbotHandler.getTrains
)

// lấy dữ liệu ý định
router.get('/get-intents'
    , chatbotHandler.getIntents
)

// Gửi lên câu yêu cầu
// Trả về câu trả lời phù hợp mà máy đã học
router.post('/request-answer'
    , postHandler.jsonProcess
    , chatbotHandler.getFastTextAnswer
)

// Gửi câu trả lời ở câu request trước đó do người dùng gửi lại cho máy học
// Và yêu cầu người dùng xác định chủ đề ý định là gì?
// {request, response, intent_name}
router.post('/train-answer'
    , postHandler.jsonProcess
    , chatbotHandler.postUserAnswer
)

// Người dùng có thể bấm nút dạy máy học
// hệ thống sẽ lấy thông tin từ lúc trả lời đó
// đưa vào bộ từ điển intents, requests, response 
// những câu hỏi, câu trả lời của phiên này mà có sửa câu trả lời
// các mã bộ câu hỏi và câu trả lời được gửi lên bởi một chuổi phiên làm việc duy nhất

router.post('/run-train'
    , postHandler.jsonProcess
    , chatbotHandler.updateTrainSet
    , chatbotHandler.runExportTrainBin
)


//------ thực thi lệnh trực tiếp không cho phân quyền --- chỉ dev mới thực thi được
//1. Thực hiện nâng cấp csdl bằng các câu lệnh sql trực tiếp vào csdl
router.post('/upgrade-database'
    // , jwtTokenVerify                      // xác thực token, sẽ trả về req.user.username (hoặc username - nếu khai báo trong hàm sign) này)
    // , userHandler.getUserId               // trả về req.user.id và req.user.username
    // dữ liệu lấy câu lệnh ở đây
    , postHandler.jsonProcess // lay json_data
    //chèn yêu cầu phân quyền để thực hiện việc này
    // , adminHandler.setFunctionFromPath //thiet lap chuc nang tu pathName
    // , adminHandler.checkFunctionRole   //kiem tra quyen co khong de cho phep
    // Gửi câu lệnh sql trực tiếp lên csdl để thực thi
    , upgradeIdeaHandler.upgradeDatabase // thực thi lệnh sql
);
module.exports = router;
