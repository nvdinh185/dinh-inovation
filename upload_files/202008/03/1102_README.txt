******BÀI TẬP******
*****************************************************************************************************************************************
- Tạo servlet RegisterUserController:
	+ doGet thực hiện hiển thị giao diện trang register.jsp
	+ doPost thực hiện xử lý khi nhấn nút đăng ký.
		Khi đăng cần lưu ý: 
			* Tên đăng nhập | mật khẩu | address không được rỗng, nếu rỗng sẽ hiện thị thông báo tại màn hình đăng ký tài khoản.
			* Mật khẩu và nhập lại mật khẩu phải trùng nhau.
			* Mật khẩu phải bắt đầu ký chuỗi VNE : 
				example: 
					- VNEphut5123!@# (pass)
					- phut5123!@# (fail)
			-> Tất cả các kiểm tra validate trên đều phải thực hiện với java servlet (tại RegisterUserController )	
		
- Tạo servlet InformationUserController (index.jsp)
	Hiển thị ra thông tin User vừa đăng ký.
*****************************************************************************************************************************************
	