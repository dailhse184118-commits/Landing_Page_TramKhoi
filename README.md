# Trạm Khởi · Coffee & Kombucha

## Nội dung cập nhật ngày 30/10/2026

Trang dùng nội dung nhượng quyền và hình ảnh mới do Trạm Khởi cung cấp: định vị “Vạch xuất phát”, 6 lợi thế, 3 gói 10/25/85 triệu đồng, bảng so sánh, lộ trình và ảnh hoạt động. Chi tiết nguồn, chính sách và hành vi liên hệ: `CONTENT-UPDATE-20261030.md`.

Giữ phần mở đầu “Một hạt cà phê”, Montserrat, menu đầy đủ và 4 ly 3D tương tác. Không tạo video mới. Ảnh phóng to vừa viewport, không cần cuộn trong hộp ảnh.

Kiểm tra bản cập nhật tại 1440×900, 375×812, 768×1024 và 844×390: không tràn ngang, chọn gói, bảng so sánh, ảnh phóng to. Bộ kiểm tra ly 3D xác nhận kéo xoay, thanh góc, đặt lại, xem ảnh gốc và giảm chuyển động tại 1440×900, 375×812 và 844×390. Script và ảnh kiểm tra lưu trong review (cục bộ). Các báo cáo bên dưới mô tả các lần bàn giao trước.

## Deploy bằng Vercel

Import repository này trong Vercel, giữ Root Directory là thư mục gốc repository (`./`). File `vercel.json` đã chọn output là `site/`, không chạy bước install hoặc build. Framework Preset là Other nếu giao diện hỏi. Sau đó bấm Deploy. Không đặt Root Directory thành `site` khi vẫn dùng cấu hình gốc này.

Repository chỉ chứa website, tài liệu và khai báo dependency. Các thư mục `review/`, `source-assets/`, `.agents/`, `.codex/`, `node_modules/` và ZIP bàn giao được giữ ở máy làm việc, không đưa lên GitHub. Những đường dẫn review trong phần bên dưới là bằng chứng kiểm tra cục bộ, không có trong repository.

Bản landing page nằm trong `site/`: một `index.html` và thư mục `assets/`. Không cần npm hoặc bước build để chạy bản bàn giao. Font và runtime Motion được lưu cục bộ. Motion 14.6.0 được lấy từ gói npm đã cài; giấy phép nằm trong assets/vendor/.

## Xem trang

Server xem thử của phiên làm việc: http://127.0.0.1:4173/

Mở địa chỉ này bằng Chrome để xem video theo cuộn. Link chỉ hoạt động trên máy đang chạy server. Nếu cần chạy lại, dùng Python trong thư mục workspace:

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory D:\Landing_Page_TramKhoi\site
```

Mở trực tiếp `site/index.html` bằng cách double-click sẽ hiển thị hero ảnh tĩnh, vì trình duyệt chặn fetch video từ file://. Điện thoại, tablet dọc, thiết bị trỏ thô có màn hình ngắn và người bật giảm chuyển động cũng dùng ảnh tĩnh. Chưa có địa chỉ public; chưa triển khai hosting.

## Nội dung và nguồn

- Các ảnh gốc người dùng cung cấp nằm trong `source-assets/`, gồm năm ảnh nhận diện/bao bì/poster ban đầu và bốn ảnh món mới.
- Ba video Google Flow do người dùng cung cấp từ Downloads, ngày 26/10/2026. Độ phân giải gốc 1280×720, 24fps; thời lượng 8 giây, khoảng 10 giây, khoảng 10 giây.
- Master web dài 27.125 giây, hai đoạn nối fade 0.45 giây. H.264, CRF 22, keyframe mỗi 8 frame, faststart, không audio. Không upscale. Giữ nguyên các dấu có sẵn trong video.
- Phim là minh họa AI. Máy xay giữa các cảnh không hoàn toàn giống nhau; không tuyên bố đây là một cú máy thật liền mạch hoặc quy trình pha đã được xác minh của nhóm.
- Bốn ảnh thức uống mới được thay đúng món: Mật Ong, Sữa, Sữa Chua, Vàng. Trang hiển thị trọn hình người dùng cung cấp; mỗi thẻ có thể mở ảnh lớn. Poster menu cũ vẫn được giữ trong nút xem menu. Cà phê bao bì và Tinh Chất Cà Phê không bị coi là cùng một sản phẩm.
- Link Zalo được giải mã trực tiếp từ QR poster menu: https://zaloapp.com/qr/g/xcnavihbxw36sivl3ojr?src=qr . QR SVG trên trang được dựng lại từ đúng URL này. Chưa kiểm chứng quyền gia nhập nhóm trong tài khoản Zalo của khách.
- Không tạo giá bán, địa chỉ, số đơn hàng, đánh giá khách hoặc công dụng sức khỏe chưa xác nhận. Không có form gửi giả.
- Không phát sinh credits Higgsfield khi tạo bản này. Yêu cầu tạo ảnh trước đó bị từ chối và số dư sau lỗi đã kiểm tra là 50.

## Kiểm tra

Kết quả được lưu tại `review/audit-results.json`, `review/flick-results.json` và `review/contrast-results.json`. Screenshot desktop/mobile trong `review/`. Đây là kiểm tra trên Chrome headless cục bộ, không thay thế việc người dùng kiểm tra điện thoại và kết nối thực tế.

Kết quả kiểm tra Motion bổ sung nằm trong `review/motion-audit-results.json`: runtime thực sự tải, đúng bốn hình mới, dải chữ chạy/dừng/tiếp tục/ngừng khi ngoài màn hình, thẻ nghiêng 3D theo chuột, 24 lần lọc liên tiếp, mở ảnh bằng Enter và trả focus sau Escape, parallax theo cuộn, giảm chuyển động bật/tắt trực tiếp và fallback khi thư viện không tải được.

Hiệu ứng mới: tiêu đề đi vào theo từng từ, thẻ sản phẩm xuất hiện xen kẽ bằng spring và nghiêng theo chuột trên thiết bị có con trỏ chính xác, sắp xếp lại món khi lọc, phản hồi hover/press của nút, ảnh cà phê và con dấu thay đổi theo cuộn, phần câu chuyện xuất hiện lần lượt, thẻ QR vào bằng spring, thanh tiến trình đọc và dải chữ có nút tạm dừng. Chuyển động không điều khiển thao tác cuộn của người dùng. Dải chữ dừng khi ngoài màn hình/tab ẩn; reduced motion hủy animation và hoàn trả trạng thái ảnh. Không sử dụng Motion+ hoặc tải runtime từ CDN. Three.js đã cài trong workspace nhưng không được tải vào trang trong lần chỉnh này.

Cập nhật typography: toàn bộ chữ HTML dùng Montserrat 400/500/600/700/800 được lưu cục bộ, gồm ký tự tiếng Việt. Tiêu đề được render nguyên từ để giữ shaping/kerning tiếng Việt, không chia thành từng ký tự riêng; Motion vẫn cho từng từ xuất hiện và xoay nhẹ theo chiều sâu. Chữ nhấn có gradient vàng mật ong/xanh ngọc trên nền tối, xanh rừng/xanh ngọc trên nền sáng. Lớp nền HTML/CSS dùng ba quầng màu chuyển động bằng transform, có pause theo visibility và reduced motion. Dòng chú thích phim/nguồn ảnh ở footer đã bỏ theo yêu cầu người dùng; phần nguồn trong tài liệu này vẫn giữ. Font trong các ảnh có sẵn là một phần của ảnh gốc, không bị sửa.

Theo yêu cầu người dùng, watermark ngôi sao bốn cánh được xử lý trên bản web bằng FFmpeg delogo tại vùng x1125/y565, rộng 80/cao 80 trong khung 1280×720. Bản video trước xử lý nằm trong review/hero-before-watermark-fix.mp4. Poster và ảnh tĩnh được trích lại từ bản web đã xử lý. Đây là nội suy vùng ảnh, không phục hồi chi tiết gốc ở vùng dấu. Các file video gốc trong Downloads không thay đổi. Thanh cuộn dọc của trang và dialog được ẩn bằng CSS scrollbar-width/WebKit scrollbar; không khóa overflow-y hoặc vô hiệu cuộn.

- Video theo cuộn ở sáu vị trí, menu lọc vị, lightbox/Escape, anchor hợp lệ.
- Các viewport: 1440×900, 1280×800, 375×812, 375×667, 768×1024, 844×390.
- Không tràn ngang, menu mobile mở/đóng, không tải video ở chế độ tĩnh.
- Reduced motion bật/tắt trực tiếp và trang vẫn đầy đủ khi video lỗi.
- Ba cỡ flick 120/240/360px và kiểm tra độ tương phản chữ trên 12 khung hình, dùng pixel sáng nhất trong từng vùng chữ sau lớp phủ.

## Bàn giao và cập nhật

Chỉ đưa nội dung `site/` lên host. Không đưa source-assets, review, các script hoặc tài liệu lên host. Zip bàn giao có index.html ở gốc và assets bên cạnh.

Trang đã có og:url/og:image theo địa chỉ Vercel hiện tại. Khi đổi domain, cập nhật hai giá trị này trong site/index.html.
