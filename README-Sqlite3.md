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

# Hướng dẫn mới cho nhánh mới

