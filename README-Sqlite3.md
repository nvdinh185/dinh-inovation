## Hướng dẫn sử dụng cơ sở dữ liệu sqlite3
# 1. Tạo file excel theo cấu trúc quy định trong file tại ./excel/sqlite-inovation-manager-v1.xlsx
Lưu ý: Cấu trúc kiểu dữ liệu, các khóa chính, index và tự tạo id ...

# 2. Dùng lệnh sau để tạo csdl ban đầu sử dụng cho sqlite:
```sh
node ./create-sqlite3-from-excel.js
```

# 3. CSDL sẽ tạo ở đường dẫn ./db/database/inovation-manager.v1.db
Tất cả các bảng được thiết kế trên excel và dữ liệu tương ứng trong từng bảng sẽ tự động tạo và insert dữ liệu vào đầy đủ.

# 4. Sử dụng user = abc và password xyz để demo test chương trình

# Hướng dẫn mới cho nhánh mới:

``` sh
# xem đang ở nhánh nào
git branch
# tạo một nhánh mới rẻ từ nhánh đang hiện hữu sang để sửa, thêm, bớt
git branch <tên nhánh mới rẻ sang>
# chuyển sang nhánh mới để thực hiện - không ảnh hưởng đến nhánh cũ
git checkout <tên nhánh mới rẻ sang>
# đẩy lên máy chủ tên nhánh mới
git push --set-upstream mf3 <tên nhánh mới rẻ sang>


# từ client khác, muốn lấy về thì
git pull mf3 <tên nhánh mới rẻ sang>/<hoặc bỏ trống sẽ lấy cấu trúc ở header>
# chuyển sang nhánh mới
git checkout <tên nhánh mới rẻ sang>


# Để xóa nhánh không dùng đến nữa dùng lệnh tại máy local
git branch -d <tên nhánh cần xóa>
# xóa trên máy chủ git tên nhánh mới này
git push mf3 --delete <tên nhánh cần xóa>

```


## Tạo chatbot
# Tạo danh mục chat ở file excel: ./db/excel/fasttext-chat-bot-sample-ver1.0.xlsx
# Thực hiện tạo cơ sở dữ liệu chat bằng lệnh
``` sh
node ./create-chatbot-db-from-excel.js
```
# Sử dụng các lệnh ở client để chat và huấn luyện mô hình như sau
```sh

# server: http://localhost:9223;
# 1. Test dự đoán câu gõ trên trình duyệt cho kết quả xác xuất
https://c3.mobifone.vn/m-inovation/chatbot/get-predict?message=Bạn là con trai hay con gái


# 2. Test câu hỏi để máy trả lời bằng lệnh post
curl -X POST -H 'Content-Type: application/json; charset=utf-8' -d '{ "message": "Xin chào bạn"}' https://c3.mobifone.vn/m-inovation/chatbot/request-answer


# 3. Dạy cho bot học cặp câu hỏi và câu trả lời
curl -X POST -H 'Content-Type: application/json; charset=utf-8' -d '{ "request":"Bạn là con trai hay con gái", "response":"Tôi là người máy, giới tính linh hoạt", "intent_name":"Giới tính"}' https://c3.mobifone.vn/m-inovation/chatbot/train-answer


# 4. Chạy huấn luyện cho bot
curl -X POST -H 'Content-Type: application/json; charset=utf-8' -d '{ "message": "run train"}' https://c3.mobifone.vn/m-inovation/chatbot/run-train


# 5. Thử dữ liệu huấn luyện thành công không?
curl -X POST -H 'Content-Type: application/json; charset=utf-8' -d '{ "message": "trai hay gái"}' https://c3.mobifone.vn/m-inovation/chatbot/request-answer

# 6. Nâng cấp cơ sở dữ liệu (giành cho developper)
curl -X POST -H 'Content-Type: application/json; charset=utf-8' -d '{ "sql": "select id, request, response, intent_name, intent_id, status from bot_logs where status=2 and intent_name is not null"}' http://localhost:9223/m-inovation/chatbot/upgrade-database

```


