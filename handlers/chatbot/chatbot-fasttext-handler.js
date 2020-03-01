"use strict"

const fs = require('fs');

const FastText = require('node-fasttext');

const arrObj = require('../../utils/array-object');

const vn = require('../../utils/vietnamese-handler');

const db = require('../../db/sqlite3/db-pool-chatbot');


// xuất dữ liệu từ bảng requests là bảng mẫu huấn luyện được đánh dấu là các intent_id
// nếu các câu yêu cầu (request) có nội dung tương tự sẽ có xác suất của intent_id là cao nhất
const exportDb2Train = (fileOutput) => {

    return new Promise(async (resolve, reject) => {
        try {
            let requests = await db.getRsts(`select intent_id, request, intent_ids from requests`)
            let trainFile = fileOutput || __dirname + '/data/train.bot.db.txt'
            let writeStream = fs.createWriteStream(trainFile);
            for (let i = 0; i < requests.length; i++) {
                let el = requests[i];
                // lượt bỏ dấu xuống dòng, dấu tab...
                let strTrain = vn.convertPlainText(el.request)
                // trường hợp có nhiều ý định ở đây cần tạo ra nhiều nhãn này
                let intentIds = el.intent_ids ? JSON.parse(el.intent_ids) : []
                if (!intentIds.find(x => x === el.intent_id)) intentIds.push(el.intent_id)
                let labels = "";
                for (let i = 0; i < intentIds.length; i++) {
                    labels += "__label__bot#" + intentIds[i] + " "
                }
                // cho máy tập huấn luyện chữ hoa, chữ thường, chữ không dấu là như nhau
                writeStream.write(labels + strTrain + '\n', 'utf-8');
                writeStream.write(labels + strTrain.toLowerCase() + '\n', 'utf-8');
                writeStream.write(labels + strTrain.toUpperCase() + '\n', 'utf-8');
                writeStream.write(labels + vn.convertVietnamese2None(strTrain) + '\n', 'utf-8');
                writeStream.write(labels + vn.convertVietnamese2None(strTrain).toLowerCase() + '\n', 'utf-8');
                writeStream.write(labels + vn.convertVietnamese2None(strTrain).toUpperCase() + '\n', 'utf-8');
            }
            writeStream.on('finish', () => {
                // console.log('wrote all data to file after end()');
                resolve('Đã xuất bản xong tập huấn luyện tại ' + trainFile)
            });
            writeStream.end();
        } catch (err) {
            // console.log('Lỗi: ', err);
            reject(err)
        }
    })

}

// thực hiện công việc huấn luyện, nếu có file dữ liệu huấn luyện đầu vào thì sẽ cho ra
// file được huấn luyện. mặc định sẽ lấy tên file như bên dưới
const trainFastText = (fileInput, fileOutput) => {
    let config = {
        lr: 1.0,    // learning rate (0.05) - tốc độ học - từ 0-1 (0 tức không học, 1 tức học sâu, dữ liệu ít thì học sâu hơn)
        dim: 5,      // size of word vectors (orj 100) (kích cỡ vector chứa từ, càng lớn là lưu trữ từ càng nhiều, dữ liệu ít thì cửa sổ này bé thôi)
        ws: 5,       // size of context window (Kích cỡ cửa sổ ngữ cảnh)
        epoch: 100,  // number of epochs (số lượng lần huấn luyện cho mỗi mẫu tăng từ 5-100, càng huấn luyện nhiều thì độ chính xác càng lớn nếu dữ liệu ít)
        neg: 5,      // number of negatives sampled (Số lượng mẫu tiêu cực - âm tính)
        wordNgrams: 2, // max length of word ngram (Kích cỡ từ ghép để tăng ngữ cảnh, default là 1 từ rời, tăng lên sẽ có ý nghĩa cho các từ gần nhau)
        input: fileInput || __dirname + "/data/train.bot.db.txt",
        output: fileOutput || __dirname + "/models/model.bot"
    }
    return new Promise((resolve, reject) => {
        // cho học tạo ra file model.bin
        // lần sau cho học tiếp thì đưa vào tiếp
        FastText.train("supervised", config, function (success, error) {
            if (error) {
                // console.log('loi', error);
                reject(error)
            } else {
                // console.log(success);
                resolve(success)
            }
        })
    })
}

// Trả kết quả là mảng xác suất cho câu đưa vào về cho các nhãn đã được huấn luyện
// trong tập được huấn luyện là dữ liệu đưa vào
// số bảng ghi xác suất trả về mặc định là 3, còn nếu muốn sẽ trả về theo yêu cầu
const getFastTextResults = (message, fileModel, maxReturnLength) => {
    return new Promise((resolve, reject) => {
        FastText.predict(
            fileModel || __dirname + "/models/model.bot.bin"
            , maxReturnLength || 3
            , [message]
            , (success, error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(success)
                }
            })
    })
}

// Trả câu trả lời ngẫu nhiên khi nhận biết được mã ý định này
// danh mục câu trả lời theo ý định nằm ở bảng responses
const getAnswerFromId = (intentId) => {
    return new Promise((resolve, reject) => {
        db.getRsts(`select * from responses where intent_id = ${intentId}`)
            .then(data => {
                resolve(data[Math.floor(Math.random() * data.length)].response)
            })
            .catch(err => {
                reject(err);
            });
    })
}

// đợi một giây để tạo dữ liệu huấn luyện lại
setTimeout(async () => {
    try {
        let exportResult = await exportDb2Train();
        // console.log(arrObj.getTimestamp(), "TRAIN DATA-CHATBOT:", exportResult);
        let trainResult = await trainFastText();
        console.log(arrObj.getTimestamp(), "TRAIN BIN - CHATBOT OK");
    } catch (err) {
        console.error(arrObj.getTimestamp(), "ERROR TRAIN - CHATBOT:", err);
    }
}, 1000)


/**
 * Tao mot y dinh moi
 * @param {*} intentName 
 */
const createNewIntent = (intentName) => {
    return new Promise(async rs => {
        try {
            await db.insert(db.convertSqlFromJson('intents', { name: intentName, created_time: Date.now() }, []))
        } catch (err) {
            // console.log('***>', err);
        } finally {
            let row = await db.getRst(`select id from intents where name='${intentName}'`)
            rs(row.id)
        }
    })
}

class FastTextHandler {

    // 1.  Huấn luyện
    // Thực hiện gửi tập huấn luyện lên máy chủ là chuỗi json
    // chức năng này là của admin, có user_id nhé
    /**
     * Mảng ý định = [{intent:{id:<nếu có thì update lại>, name:"Hỏi về Sản phẩm C90", description:"Các câu hỏi về gói cước C90"}
     *                  , requests:["Các câu hỏi tương tự, dùng làm bài huấn luyện để máy nhận diện được ý định này",....] 
     *                  , responses:["Các câu trả lời tự động ngẫu nhiên, có khả năng làm người yêu cầu hài lòng nhất",....] 
     *                  }]
     */
    runExportTrainBin(req, res, next) {

        let trainPromise = new Promise(async (resolve, reject) => {

            try {

                let exportResult = await exportDb2Train();
                console.log(arrObj.getTimestamp(), exportResult);
                let trainResult = await trainFastText();
                console.log(arrObj.getTimestamp(), trainResult);
                resolve(trainResult)
            } catch (err) {
                console.error(arrObj.getTimestamp(), err);
                reject(err)
            }
        })
        // trả kết quả huấn luyện cho mô hình
        trainPromise
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(result));
            })
            .catch(err => {
                res.status(401).json({
                    error: err,
                    message: 'Lỗi huấn luỵện mô hình'
                })
            });
    }

    // Trả về dữ liệu huấn luyện
    getTrains(req, res, next) {
        db.getRsts(`select * from bot_logs where status>0`)
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(result));
            })
            .catch(err => {
                res.status(401).json({
                    error: err,
                    message: 'Lỗi lấy dữ liệu huấn luyện'
                })
            });
    }

    // 2. Trả về mảng xác suất của mệnh đề nhập vào là gần đúng nhất
    // mục đích sẽ sắp xếp tiêu đề phù hợp nhất theo xác suất các mệnh đề tương tự
    getFastTextPredict(req, res, next) {
        getFastTextResults(req.paramS.message || (req.json_data ? req.json_data.message : ''), null, 3)
            .then(result => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(arrObj.getJsonStringify(result));
            })
            .catch(err => {
                res.status(401).json({
                    error: err,
                    message: 'Lỗi dự đoán mô hình'
                })
            });
    }

    // 3. Trả về câu trả lời dựa vào xác xuất cao nhất
    async getFastTextAnswer(req, res, next) {
        // console.log(req.paramS, req.json_data);
        let message = req.paramS.message || (req.json_data ? req.json_data.message : '');
        try {
            let result = await getFastTextResults(message)
            let itent_id = result[0].label.split('#').pop();
            let tagId = isNaN(itent_id) ? 4 : parseInt(itent_id) // mã ý định 4 là câu trả lời chưa xác định
            let answer = await getAnswerFromId(tagId);

            try {
                // ghi vào bảng log để admin review và chỉnh sửa cho phù hợp
                await db.insert(db.convertSqlFromJson('bot_logs'
                    , {
                        // session_hash:'',
                        request: message,
                        response: answer,
                        intent_id: itent_id,
                        machine_response: JSON.stringify(result
                            , (key, value) => {
                                if (key === "text") return undefined
                                return value
                            }),
                        created_time: Date.now()
                    }, []))
            } catch (errLog) { console.log(errLog) }

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(arrObj.getJsonStringify({ status: "OK", message: answer }));
        } catch (err) {
            // console.log('Lỗi:', err);
            res.status(401).json({
                error: err,
                message: 'Lỗi tìm kết quả trả lời cho câu yêu cầu'
            })
        }
    }

    // 4. Người dùng sửa lại câu trả lời từ câu trả lời trước đó mà máy trả lời không phù hợp
    async postUserAnswer(req, res, next) {
        let userPairTrain = req.json_data;
        /**
         * request, response, intent_name
         */
        try {
            // ghi vào bảng log để admin review và chỉnh sửa cho phù hợp
            await db.insert(db.convertSqlFromJson('bot_logs'
                , {
                    ...userPairTrain,
                    status: 2,      // cặp huấn luyện người dùng gửi lên để tạo dữ liệu huấn luyện
                    created_time: Date.now()
                }, []))

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(arrObj.getJsonStringify({ status: "OK", message: "Đã ghi dữ liệu huấn luyện" }));

        } catch (err) {
            // console.log('Lỗi:', err);
            res.status(401).json({
                error: err,
                message: 'Lỗi ghi log huấn luyện'
            })
        }
    }

    async updateTrainSet(req, res, next) {
        // Lấy danh sách huấn luyện từ log vào các bảng intents, requests, responses
        db.getRsts(`select 
                            id,
                            request,
                            response,
                            intent_name,
                            intent_id,
                            intent_ids,
                            status
                            from bot_logs
                    where status=2 
                    and request is not null
                    and response is not null
                    and (intent_name is not null or intent_id is not null)
                    `)
            .then(async data => {
                if (data && data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        let el = data[i];
                        let intentId = el.intent_id;
                        if (!intentId) intentId = await createNewIntent(el.intent_name)
                        // console.log('***> intentid', intentId);
                        if (intentId) {
                            try {
                                await db.insert(db.convertSqlFromJson('requests'
                                    , {
                                        request: el.request,
                                        intent_id: intentId,
                                        intent_ids: el.intent_ids,
                                        created_time: Date.now()
                                    }
                                    , []))
                            } catch (e) { console.log(e) }
                            try {
                                await db.insert(db.convertSqlFromJson('responses'
                                    , {
                                        response: el.response,
                                        intent_id: intentId,
                                        intent_ids: el.intent_ids,
                                        created_time: Date.now()
                                    }
                                    , []))
                            } catch (e) { console.log(e) }
                        }
                        try {
                            await db.update(db.convertSqlFromJson('bot_logs', { id: el.id, updated_time: Date.now(), status: 1 }, ['id']))
                        } catch{ }
                    }
                    next()
                } else {
                    res.status(401).json({
                        message: 'Không có dữ liệu mới nào được huấn luyện'
                    })
                }
            })
            .catch(err => {
                console.log('Lỗi: ', err);
                res.status(401).json({
                    error: err,
                    message: 'Lỗi đồng bộ dữ liệu huấn luyện'
                })
            });

    }
}

module.exports = new FastTextHandler();