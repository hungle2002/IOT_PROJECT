# Dự án về hệ thống trộn và tưới cây thông minh
## Giới thiệu:

Dự án này hướng đến việc phát triển hệ thống trộn và tưới cây thông minh, giúp người dùng tự động hóa quy trình và đồng bộ các thiết bị tưới. Người dùng có thể dễ dàng điều khiển và theo dõi hệ thống thông qua ứng dụng di động mà không cần thao tác trực tiếp trên phần cứng.

## Cách chạy dự án:

### 1. Chuẩn bị:

Clone repository về máy.
Cài đặt Node.js và npm nếu chưa có.
### 2. Chạy server backend:

- Mở terminal và di chuyển đến thư mục Back_end:

`cd Back_end`

- Cài đặt các package cần thiết:

`npm install`

- Compile project:

`npm run compile`

__Lưu ý:__  Để chạy server, bạn cần có Adafruit key. Vui lòng liên hệ tác giả qua email lehung16082002@gmail.com để lấy key.

- Khởi động server:

`npm run start`

- Sau khi khởi động thành công, server sẽ hiển thị thông báo

`Server listen on port 3000....`
### 3. Chạy ứng dụng di động:

- Mở terminal và di chuyển đến thư mục android:

`cd android`

- Cài đặt các package cần thiết:

`npm install`

- Cấu hình địa chỉ IP:

  - Mở terminal và chạy lệnh ipconfig để lấy địa chỉ IP của máy.
  - Mở file android/src/config/ipConfig.js.
  - Cập nhật giá trị ipAddress với địa chỉ IP lấy được.

- Khởi động ứng dụng di động:

`npm run android`

### 4. Sử dụng hệ thống:

- Mở ứng dụng di động trên thiết bị di động hoặc thiết bị ảo (lưu ý cài đặt Android studio nếu muốn sử dụng thiết bị ảo).
- Kết nối ứng dụng với server bằng địa chỉ IP đã cấu hình.
- Điều khiển hệ thống trộn và tưới cây thông qua các chức năng trên ứng dụng.
## Lưu ý:
Hệ thống này vẫn đang trong quá trình phát triển, có thể có thay đổi trong tương lai.
Vui lòng tham khảo tài liệu hướng dẫn chi tiết hơn để biết thêm thông tin về cách sử dụng hệ thống.
Liên hệ:

Email: lehung16082002@gmail.com
