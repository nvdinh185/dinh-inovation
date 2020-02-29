const router = require('express').Router();

const postHandler = require('../../utils/post-handler');

const fasttextHandler = require('../../handlers/fasttext/fasttext-handler')

router.get('/get-array'
    , fasttextHandler.getFastTextArray
)

router.get('/get-array-ideas'
    , fasttextHandler.getFastTextArrayIdeas
)

router.post('/get-array'
    , postHandler.jsonProcess
    , fasttextHandler.getFastTextArray
)

router.get('/get-answer'
    , fasttextHandler.getFastTextAnswer
)

router.post('/get-answer'
    , postHandler.jsonProcess
    , fasttextHandler.getFastTextAnswer
)

// thực hiện việc huấn luyện lại tập chủ đề để lấy các chủ đề mới
router.get('/run-train'
    , fasttextHandler.runExportTrainBin
)

module.exports = router;
