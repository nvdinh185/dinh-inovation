const router = require('express').Router();

const postHandler = require('../../utils/post-handler');

const userHandler = require('../../handlers/idea/user-handler-sqlite3')
const listHandler = require('../../handlers/idea/list-handler-sqlite3')
const ideaHandler = require('../../handlers/idea/idea-handler-sqlite3')

// thực hiện xác thực token user đã được cấp
const jwtTokenVerify = require('../../utils/jwt-token-verify');

// Các đường dẫn tương tác với csdl users
router.get('/get-user-info'
    , jwtTokenVerify
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
    , postHandler.jsonProcess
    , userHandler.editUser
    , userHandler.getUserInfo
)

// đường dẫn lấy thông tin likes, comments
router.get('/get-idea-parameters'
    , jwtTokenVerify
    , listHandler.getListParameters
)

// các đường dẫn cho ý tưởng

router.get('/get-ideas'
    , jwtTokenVerify
    , ideaHandler.getIdeas
)

router.post('/create-idea'
    , jwtTokenVerify
    , userHandler.getUserId
    , postHandler.formProcess
    , ideaHandler.createIdea
)

router.post('/edit-idea'
    , jwtTokenVerify
    , postHandler.jsonProcess
    , ideaHandler.editIdea
)

router.post('/delete-idea'
    , jwtTokenVerify
    , postHandler.jsonProcess
    , ideaHandler.delIdea
)

router.get('/get-idea'
    , jwtTokenVerify
    , ideaHandler.getIdea
)

router.post('/like-idea'
    , jwtTokenVerify
    , userHandler.getUserId
    , postHandler.jsonProcess
    , ideaHandler.likeIdea
    , ideaHandler.getIdea
)

router.post('/comment-idea'
    , jwtTokenVerify
    , userHandler.getUserId
    , postHandler.formProcess
    , ideaHandler.commentIdea
    , ideaHandler.getIdea
)

router.get('/get-attach-files'
    , jwtTokenVerify
    , listHandler.getIdeasAttachs
)

router.get('/get-file-id'
    , listHandler.getFileAttach
)

router.get('/get-questions'
    , jwtTokenVerify
    , listHandler.getQuestions
)

router.get('/user-mark-idea'
    , jwtTokenVerify
    , userHandler.getUserId
    , ideaHandler.getUserMarkIdea
)

router.post('/mark-idea'
    , jwtTokenVerify
    , userHandler.getUserId
    , postHandler.jsonProcess
    , ideaHandler.markIdea
)

module.exports = router;