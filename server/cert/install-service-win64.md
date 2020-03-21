TẠO SERVICE TRONG WINDOWS
Sử dụng phần mềm nssm
Giả sử cần tạo service tự động start một file .bat lên khi restart lại windows.
Các bước thực hiện như sau:
1. Tạo file .bat, có thể add thêm các biến môi trường (hoặc add biến môi trường ở bước 3.3), bắt buộc thêm dòng pause cuối file
2. Mở cmd tại folder chứa file nssm.exe, chạy lệnh sau:
	nssm install "<service_name>"
	Xuất hiện màn hình ở bước 3
3. Màn hình thiết lập service:
3.1 Ở tab Application, chọn đường dẫn tới file bat:
 
3.2 Ở tab Log on, nhập thông tin account login vào máy: 
 
3.3 Ở tab Environment, đặt các biến môi trường (nếu có):
 
Xong nhấn nút Install service để hoàn tất.
Muốn xóa service thì dùng lệnh:
	nssm remove "<service_name>" confirm
