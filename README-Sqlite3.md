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




