# Thông báo sự kiện và âm thanh tu tiên

## Mục tiêu
- Thay dải thông báo hiện tại bằng popup tự động theo đúng loại sự kiện và thời gian hiển thị.
- Thêm nhạc nền cổ phong nhẹ, hiệu ứng âm thanh cho đột phá, luyện đan và nhận tài nguyên.
- Thêm nút âm thanh cố định, dễ thao tác trên điện thoại và ghi nhớ lựa chọn.

## Thực hiện
1. Mở rộng tín hiệu sự kiện trong vòng chơi để phân biệt đột phá tầng nhỏ, đại cảnh giới, luyện đan và kết quả phiêu lưu lớn.
2. Hiển thị popup gọn cho sự kiện thường; popup đại cảnh giới có hào quang và thời lượng 3,5 giây.
3. Tạo âm thanh bằng Web Audio API, gồm giai điệu nền lặp nhẹ và ba nhóm hiệu ứng; chỉ khởi chạy sau thao tác của người chơi để phù hợp quy định trình duyệt.
4. Thêm nút bật/tắt âm thanh ở góc trên và lưu lựa chọn vào bộ nhớ trình duyệt.
5. Kiểm tra giao diện và hành vi trên màn hình máy tính lẫn điện thoại.

## Chi tiết kỹ thuật
- Không cần tải tệp nhạc ngoài; âm thanh được tổng hợp trực tiếp để tải nhanh và hoạt động ngoại tuyến.
- Mặc định âm thanh tắt cho người chơi mới; bật một lần sẽ được ghi nhớ.
- Popup có `aria-live`, tôn trọng cài đặt giảm chuyển động và không che thao tác chính.
