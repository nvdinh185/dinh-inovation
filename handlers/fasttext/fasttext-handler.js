"use strict"

const fs = require('fs');

const FastText = require('node-fasttext');

const arrObj = require('../../utils/array-object');


const db = require('../../db/sqlite3/db-pool');


// xuất dữ liệu từ bảng requests là bảng mẫu huấn luyện được đánh dấu là các intent_id
// nếu các câu yêu cầu (request) có nội dung tương tự sẽ có xác suất của intent_id là cao nhất
const exportDb2Train = (fileOutput) => {

    return new Promise(async (resolve, reject) => {
        try {
            let requests = await db.getRsts(`select id, title, description from ideas`)
            let trainFile = fileOutput || __dirname + '/data/train.idea.db.txt'
            let writeStream = fs.createWriteStream(trainFile);
            for (let i = 0; i < requests.length; i++) {
                let el = requests[i];
                writeStream.write('__label__Idea#' + el.id + ' ' + el.title /* + "; " + el.description */ + '\n', 'utf-8');
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
        dim: 100,
        input: fileInput || __dirname + "/data/train.idea.db.txt",
        output: fileOutput || __dirname + "/models/model.idea.db"
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
const getFastTextResults = (statement, fileModel, maxReturnLength) => {
    return new Promise((resolve, reject) => {
        FastText.predict(
            fileModel || __dirname + "/models/model.idea.db.bin"
            , maxReturnLength || 3
            , [statement]
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
        db.getRsts(`select * from ideas where id = ${intentId}`)
            .then(data => {
                resolve(data[Math.floor(Math.random() * data.length)].answer)
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
        console.log(arrObj.getTimestamp(), "TRAIN DATA:", exportResult);
        let trainResult = await trainFastText();
        console.log(arrObj.getTimestamp(), "TRAIN BIN:", trainResult);
    } catch (err) {
        console.error(arrObj.getTimestamp(), "ERROR TRAIN: ", err);
    }
}, 1000)


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

            // thực hiện insert vào csdl này
            // .....

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

    // 2. Trả về mảng xác suất của mệnh đề nhập vào là gần đúng nhất
    // mục đích sẽ sắp xếp tiêu đề phù hợp nhất theo xác suất các mệnh đề tương tự
    getFastTextArray(req, res, next) {
        getFastTextResults(req.paramS.statement || (req.json_data ? req.json_data.statement : ''), null, 10)
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

    // lấy danh mục ý tưởng
    getFastTextArrayIdeas(req, res, next) {
        getFastTextResults(req.paramS.statement || (req.json_data ? req.json_data.statement : ''), null, 10)
            .then(result => {
                let ids = [];
                for (let i = 0; i < result.length; i++) {
                    let itent_id = result[i].label.split('#').pop();
                    let tagId = isNaN(itent_id) ? 0 : parseInt(itent_id);
                    ids.push(tagId);
                }

                db.getRsts(`select id, title, description from ideas where id in (${ids.toString()})`)
                    .then(data => {
                        console.log('dữ liệu trả về', ids);
                        let resultOrder = [];
                        for (let j = 0; j < ids.length; j++) {
                            let findData = data.find(x => x.id === ids[j]);
                            if (findData) resultOrder.push(findData)
                        }
                        // console.log('dữ liệu trả về', resultOrder);
                        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(arrObj.getJsonStringify(resultOrder));
                    })
                    .catch(err2 => {
                        console.log('Lỗi', err2);
                        res.status(401).json({
                            error: err2,
                            message: 'Lỗi lấy danh sách'
                        })
                    });

            })
            .catch(err => {
                res.status(401).json({
                    error: err,
                    message: 'Lỗi dự đoán mảng'
                })

            });
    }

    // 3. Trả về câu trả lời dựa vào xác xuất cao nhất
    async getFastTextAnswer(req, res, next) {
        // console.log(req.paramS, req.json_data);
        try {
            let result = await getFastTextResults(req.paramS.statement || (req.json_data ? req.json_data.statement : ''))
            let itent_id = result[0].label.split('#').pop();
            let tagId = isNaN(itent_id) ? 0 : parseInt(itent_id)
            let answer = await getAnswerFromId(tagId);
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

}

module.exports = new FastTextHandler();