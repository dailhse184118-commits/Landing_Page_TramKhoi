# Trạm Khởi, đề xuất landing page

Trạng thái: đã dựng bản xem thử bằng ba video Google Flow do người dùng cung cấp. Trang nằm trong site/, server cục bộ tại http://127.0.0.1:4173/. Đã kiểm tra chức năng và responsive bằng Chrome headless; chờ người dùng xem và phản hồi. Chưa public. Không tiêu thêm credits Higgsfield.

## Mục tiêu đã được người dùng chọn

Giới thiệu Coffee & Kombucha và mời tham gia cộng đồng Trạm Khởi. Kiosk là câu chuyện mở rộng. Nút hành động chính: “Tham gia cộng đồng”.

## Nguồn nội dung

Logo, poster menu, hai ảnh bao bì cà phê và poster kiosk do người dùng cung cấp. Nội dung thương hiệu lấy từ các nguồn này và mô tả trực tiếp của người dùng. Giá, địa chỉ, lịch bán, đánh giá khách hàng và công dụng sức khỏe chưa được xác nhận, không đưa ra như dữ kiện.

Tham khảo định tính về câu hỏi hương vị của người mới uống, không phải khảo sát khách hàng Việt Nam hoặc khách hàng Trạm Khởi:
- https://www.reddit.com/r/Kombucha/comments/1jq2zjz/
- https://www.reddit.com/r/Kombucha/comments/191zhda/first_time_drinking_it_horrible_taste/

## Ý tưởng xuyên suốt

Một trạm dừng nhỏ để thử một vị mới và gặp những người cùng chung tinh thần bắt đầu. Dấu ấn thị giác: đường cong lấy cảm hứng từ cánh cửa trong logo, dẫn từ phần mở đầu đến lời mời vào cộng đồng.

## Ba hướng hero để lựa chọn

1. Rót một khởi đầu mới, đề xuất: một dòng đồ uống màu hổ phách rót xuống ly đá trong ánh nắng, ly ở bên phải, vùng nền xanh dịu ở bên trái dành cho chữ. Kết thúc khi ly đầy và mặt nước lắng lại. Một shot liên tục, khoảng 6 giây, không tay người và không chuyển đổi cà phê thành kombucha.
2. Ghé một trạm xanh: máy quay tiến nhẹ qua tán lá đến một ly đồ uống trên bàn xanh. Kết thúc ở bố cục cận ly, khoảng trống bên trái cho tiêu đề.
3. Từ hạt đến trạm: máy quay hạ dọc qua một cành cà phê quả vàng đến túi cà phê thật trên bàn. Kết thúc ở ảnh sản phẩm, không mô phỏng sự biến đổi hạt thành đồ uống. Hướng này nhấn mạnh cà phê hơn kombucha.

Các cảnh AI là hình ảnh minh họa cảm hứng thương hiệu. Ảnh menu và bao bì thật nằm ở các phần sản phẩm. Điện thoại và người bật giảm chuyển động dùng bố cục ảnh tĩnh.

## Hệ thống thị giác đề xuất

- Canvas: #F1F3E8, sắc sáng hơi xanh.
- Text và mảng sâu: #163E2D, xanh rừng từ nhận diện.
- Secondary: #52664D, xanh lá trầm.
- Accent: #E7BC56, vàng cà phê, dành cho nút chính và một vài điểm nhấn.
- Panel: #E3E9DA, xanh nhạt.
- Heading: Be Vietnam Pro 600, 700, 800.
- Body: Be Vietnam Pro 400, 500.
- Labels số nhỏ: IBM Plex Mono 400, 500.
- Kiểm tra độ tương phản khi triển khai; token là đề xuất, chưa đo trên bản dựng.

## Bố cục và nội dung dự kiến

### Thanh điều hướng

Logo Trạm Khởi. “Thức uống”, “Câu chuyện”, “Cộng đồng”. Nút “Ghé cộng đồng”. Menu thu gọn trên điện thoại.

### Hero

Nhãn: “COFFEE & KOMBUCHA”.

Tiêu đề: “Trạm tỉnh táo. Chạm tương lai.”

Mô tả: “Một chút đậm đà của cà phê. Một chút chua thanh từ kombucha. Ghé Trạm Khởi, tìm vị của bạn.”

Nút chính: “Tham gia cộng đồng”. Liên kết phụ: “Khám phá thức uống”.

### Nhịp cuộn, phương án 1

Các khoảng là điểm xuất phát để kiểm thử, không phải kết quả đã xác minh.

| Khoảng | Cảnh | Chữ | Chuyển động chữ |
|---|---|---|---|
| 0–0.34 | Dòng nước bắt đầu rót vào ly phía phải | “Trạm tỉnh táo.” | Chữ hiện ổn định ở đầu trang |
| 0.34–0.68 | Mực nước lên, đá chuyển động nhẹ | “Một vị mới cho ngày của bạn.” | Từng cụm chữ hạ nhẹ |
| 0.68–1 | Dòng rót ngừng, ly đứng yên | “Chạm tương lai.” | Tiêu đề, mô tả rồi nút lần lượt hiện |

### Thức uống

Tiêu đề: “Hôm nay, bạn chọn vị nào?”

Tương tác chọn khẩu vị bằng các nút “Chua thanh”, “Béo nhẹ”, “Đậm cà phê”. Hiển thị các món phù hợp bằng nội dung menu, không tạo điểm chua/ngọt dạng số khi chưa có số liệu.

- Kombucha Mật Ong: “Chua thanh, ngọt dịu. Thơm mật ong.”
- Kombucha Sữa: “Béo nhẹ, chua dịu, ngọt mềm, thơm sữa.”
- Kombucha Sữa Chua: “Chua thanh, béo mịn, ngọt nhẹ, thơm sữa.”
- Kombucha Vàng: “Đầu vị chua thanh, đắng dịu; hậu vị thơm cà phê, ngọt nhẹ.”
- Tinh Chất Cà Phê: “Đắng dịu, đậm đà, hậu vị chua nhẹ.”

### Cà phê tại trạm

Tiêu đề: “Một góc đậm đà, mang sắc vàng.”

Mô tả: “Khám phá cà phê A Vàng cùng Trạm Khởi. Xem gần hơn bao bì và câu chuyện sản phẩm.”

Ảnh mặt trước và mặt sau được xem ở kích thước lớn trong hộp thoại có nút đóng, hỗ trợ bàn phím. Không tự biến tên “Tinh Chất Cà Phê” trong poster thành túi cà phê hạt 250g; giữ hai loại tài sản tách biệt nếu chưa xác nhận chúng là cùng sản phẩm.

### Câu chuyện

Tiêu đề: “Những khởi đầu nhỏ, cùng nhau.”

Mô tả: “Trạm Khởi là dự án khởi nghiệp của một nhóm sinh viên FPT, bắt đầu từ Coffee & Kombucha và mong muốn kết nối những người trẻ.”

Liên kết mở rộng: “Khám phá mô hình kiosk”. Hiển thị thông tin trong poster: thương hiệu và nguyên liệu, đào tạo và quy trình, đồng hành vận hành. Không cam kết vốn đầu tư hoặc lợi nhuận.

### Câu hỏi thường gặp

“Chưa uống kombucha, nên bắt đầu từ đâu?”

“Bạn có thể xem mô tả từng món rồi chọn vị mình thích: mật ong ngọt dịu, sữa béo nhẹ, hoặc Kombucha Vàng có hậu vị cà phê.”

“Mình xem thông tin mới của Trạm ở đâu?”

“Ghé cộng đồng Trạm Khởi để theo dõi những cập nhật từ nhóm.”

“Mình muốn tìm hiểu kiosk thì sao?”

“Bạn có thể kết nối với nhóm qua cộng đồng để trao đổi về mô hình kiosk.”

### Cộng đồng

Tiêu đề: “Trạm có vị mới. Còn thiếu bạn.”

Mô tả: “Ghé cộng đồng Trạm Khởi, cùng trò chuyện về Coffee & Kombucha và những bước khởi đầu.”

Nút: “Tham gia cộng đồng”. Dùng QR Zalo do người dùng cung cấp. Cần giải mã hoặc xác nhận liên kết trước khi gắn nút đi thẳng; không tự tạo đường dẫn cộng đồng. Không dựng form gửi thành công giả.

### Footer

“TRẠM KHỞI · Coffee & Kombucha”. “Một dự án khởi nghiệp của nhóm sinh viên FPT.”

## Tiêu chuẩn triển khai sau khi duyệt

HTML, CSS, JavaScript thuần. Một index.html và assets/. Tài liệu và media gốc ở ngoài thư mục giao website. Motion theo quy chuẩn scrub-pipeline: Blob fetch, seek gating, lerp theo thời gian, vòng lặp nghỉ, giảm chuyển động, năm điều kiện ảnh tĩnh. Kiểm tra desktop, mobile, bàn phím, menu, chọn khẩu vị, hộp thoại, ảnh/video thiếu và liên kết cộng đồng.

Mọi cảnh tạo mới cần báo giá chính xác trước, duyệt ảnh trước video và duyệt video trước khi dựng trang quanh video. Chưa chọn model và chưa duyệt ngân sách.

Nội dung cuối được chốt trong thiết kế và dùng nguyên văn khi dựng. Kiểm tra không có em dash hoặc từ quảng cáo khuôn mẫu theo copy gate của 10k-websites.
