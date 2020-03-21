"use strict"

/**
 * Máy học chuỗi ý định
 */

const fs = require('fs');

const FastText = require('node-fasttext');

const arrObj = require('../../utils/array-object');

const vn = require('../../utils/vietnamese-handler');

const db = require('../../db/sqlite3/db-pool-chatbot');

const configFiles = {
    train: '/data/train.intent.db.txt',
    bin: "/models/model.intent"
}

// xuất dữ liệu từ bảng requests là bảng mẫu huấn luyện được đánh dấu là các intent_id
// nếu các câu yêu cầu (request) có nội dung tương tự sẽ có xác suất của intent_id là cao nhất
const exportDb2Train = (fileOutput) => {

    return new Promise(async (resolve, reject) => {
        try {
            let requests = await db.getRsts(`select id, name, description from intents`)
            let trainFile = fileOutput || __dirname + configFiles.train
            let writeStream = fs.createWriteStream(trainFile);
            for (let i = 0; i < requests.length; i++) {
                let el = requests[i];
                // lượt bỏ dấu xuống dòng, dấu tab...
                let strTrain = vn.convertPlainText(el.name /* + ' ' + el.description */)
                // trường hợp có nhiều ý định ở đây cần tạo ra nhiều nhãn này
                let intentIds = el.id
                let labels = "__label__int#" + intentIds + " "
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
        input: fileInput || __dirname + configFiles.train,
        output: fileOutput || __dirname + configFiles.bin
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
            fileModel || __dirname + configFiles.bin + ".bin"
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

// Trả ý định này
const getAnswerFromId = (intentId) => {
    return new Promise((resolve, reject) => {
        db.getRst(`select * from intents where id = ${intentId}`)
            .then(data => {
                resolve(data)
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
        let trainResult = await trainFastText();
        console.log(arrObj.getTimestamp(), "TRAIN BIN - OK", configFiles.bin);
    } catch (err) {
        console.error(arrObj.getTimestamp(), "ERROR TRAIN BIN:", configFiles.bin, err);
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
                next()  
                // cho phiên tới huấn luyện
                // res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                // res.end(arrObj.getJsonStringify(result));
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
    getFastTextPredict(req, res, next) {
        getFastTextResults(req.paramS.message || (req.json_data ? req.json_data.message : ''), null, 10)
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

    // 3. lấy danh sách theo xác suất
    getFastTextArray(req, res, next) {
        getFastTextResults(req.paramS.message || (req.json_data ? req.json_data.message : ''), null, 10)
            .then(result => {
                let ids = [];
                for (let i = 0; i < result.length; i++) {
                    let itent_id = result[i].label.split('#').pop();
                    let tagId = isNaN(itent_id) ? 0 : parseInt(itent_id);
                    ids.push(tagId);
                }

                db.getRsts(`select id, name, description from intents where id in (${ids.toString()})`)
                    .then(data => {
                        // console.log('dữ liệu trả về', ids);
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

}

module.exports = new FastTextHandler();