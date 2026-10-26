# Trạm Khởi: Một hạt cà phê. Một khởi đầu.

Trạng thái: đã dựng bản xem thử bằng ba video Google Flow do người dùng cung cấp. Trang nằm trong site/, server cục bộ tại http://127.0.0.1:4173/. Đã kiểm tra chức năng và responsive bằng Chrome headless; chờ người dùng xem và phản hồi. Chưa public. Không tiêu thêm credits Higgsfield.

Năm ảnh gốc được sao lưu trong source-assets/. Người dùng chuyển sang tự tạo video bằng Google Flow và đã gửi ba clip để dùng cho website. Master hiện tại dài 27.125 giây, 720p, hai chuyển cảnh fade 0.45 giây; xem README.md và review/ để biết dữ liệu kiểm tra. Bảng chi phí Higgsfield bên dưới là kế hoạch trước khi chuyển công cụ, không phải chi phí đã phát sinh.

## 1. Premise và mục tiêu

Hành trình người dùng yêu cầu: hạt cà phê rơi qua tán lá, vào máy xay, thành bột, vào phin rồi thành nước cà phê. Một nguyên liệu đi qua từng công đoạn, song song với câu chuyện một ý tưởng nhỏ trở thành Trạm Khởi. Trang giới thiệu Coffee & Kombucha và hướng đến nút “Tham gia cộng đồng”. Đây là phim minh họa thương hiệu, không phải tài liệu chứng minh quy trình pha thực tế của nhóm.

## 2. Quy mô và ngân sách đã hỏi công cụ

Tier 2: ba đoạn khoảng 6 giây, tổng khoảng 18 giây trước xử lý nối. Mỗi đoạn có ảnh cuối làm ảnh đầu đoạn kế tiếp. Chỉ cảnh cuối kết thúc ở trạng thái nghỉ. Điện thoại và chế độ giảm chuyển động dùng ảnh tĩnh, không tải video.

Giá hỏi connector ngày 26/10/2026, 1080p, 6 giây mỗi đoạn, không submit job:

| Model | Một đoạn | Ba đoạn, chưa ảnh | Ghi chú |
|---|---:|---:|---|
| Wan 2.7 | 15 | 45 | Đề xuất vì vừa ngân sách; chưa kiểm chứng chất lượng cảnh cụ thể |
| Wan 3.0 | 21 | 63 | Vượt số dư đã kiểm tra nếu tạo đủ ba đoạn |
| Grok Imagine Video 1.5 Lite | 24 | 72 | 1080p upscale từ 720p theo catalog |
| FLUX 3 Video | 48 | 144 | Chưa có bằng chứng hơn các model khác cho chính cảnh này |
| Grok Video 1.5 | 48 | 144 | Chưa có bằng chứng hơn các model khác cho chính cảnh này |

Ảnh đầu: GPT Image 2.5, 16:9, 2k, medium: 1 credit theo preflight. Giá cả ba cảnh Wan 2.7 được kiểm tra bằng prompt tương ứng. Tổng đề xuất: 46 credits. Số dư gần nhất: 50; còn 4 nếu cả ba đoạn thành công, không đủ tạo lại một đoạn Wan 2.7 giá 15. Không tự chi thêm ngoài tổng được duyệt. Các phần bên dưới dùng ảnh thật đã cung cấp, ngân sách ảnh hỗ trợ tạo mới là 0. Phải báo lại nếu thông số hoặc giá thay đổi.

## 3. Nhận diện

Canvas #F1F3E8, panel #E3E9DA, xanh rừng #163E2D, chữ phụ #52664D, accent vàng #E7BC56. Đây là token đề xuất, tinh chỉnh theo footage sau khi duyệt, kiểm tra contrast khi dựng. Heading Be Vietnam Pro 600/700/800, body Be Vietnam Pro 400/500, label IBM Plex Mono 400/500. Dấu ấn riêng: đường cong cánh cửa từ logo kết nối nhịp cuộn và lời mời vào cộng đồng. Không dùng vàng cho mọi chi tiết.

## 4. Storyboard

| Đoạn | Nội dung và máy quay | Điểm nối và kết thúc | Chữ trên web |
|---|---|---|---|
| 1, khoảng 6 giây | Hạt cà phê rang rơi qua tán lá, camera đi xuống theo hạt đến miệng phễu máy xay xanh sẫm | Miệng phễu che khung hình trong chuyển động. Không quay lưỡi xay hoặc dựng máy trong suốt | “Một hạt cà phê.” |
| 2, khoảng 6 giây | Tiếp hướng đi xuống từ vùng tối, ra phía vòi xả máy xay; bột cà phê rơi vào phin inox mở bên dưới | Camera đến sát lớp bột, texture tối che khung hình trong chuyển động | “Qua từng chút chăm chút.” |
| 3, khoảng 6 giây | Nước nóng rót từ vòi ấm sát mép hình vào phin. Camera đi dọc ngoài phin xuống ly, giọt cà phê tạo gợn nhẹ | Khung cuối nghỉ ở toàn bộ phin và ly phía phải, đủ khoảng cách trên dưới; bên trái dành cho tiêu đề và CTA | “Trạm tỉnh táo. Chạm tương lai.” |

Hạt đã rang xuất hiện trong tán lá là hình ảnh kể chuyện, không mô tả hạt rang mọc trên cây. Cảnh pha là thời gian được rút gọn, không ngụ ý phin pha xong trong 6 giây. Chất liệu, ánh nắng, hướng camera và trọng lực giữ nhất quán. Máy xay và phin không biến hình. Không yêu cầu AI biến một vật thành vật khác giữa khung rõ; chuyển trạng thái hạt sang bột được che bởi miệng máy.

## 5. Prompt ảnh đầu

```text
Cinematic macro photograph of a single roasted coffee bean beginning to fall at the upper right third among sunlit coffee leaves. A realistic dark green coffee grinder hopper is visible far below in right lower background at a coffee kiosk, fixed coherent gravity, no surreal objects. One continuous forest-green and soft gold world edge to edge, shaded botanical depth left for later headings. Photorealistic commercial, 16:9. No text, no logos, no lettering anywhere.
```

## 6. Prompts chuyển động

### Đoạn 1

```text
One continuous shot, no cuts. Cinematic macro commercial in a forest green and muted golden sunlit coffee kiosk. A single roasted coffee bean descends through softly moving leaves straight down toward the hopper of a realistic stationary coffee grinder. Camera tracks the same downward direction. At the end the bean and camera cross the dark hopper mouth, with brief natural motion blur and dark occlusion to motivate continuation. No hands, no exposed grinding blades. Keep machine geometry stable. Action in right third, quiet softly shaded botanical scene on left for later page captions, one edge-to-edge world. No text, no logos, no lettering anywhere.
```

### Đoạn 2

```text
One continuous shot continuing straight downward from dark motion blur inside a coffee grinder hopper. Camera follows the path of the same coffee ingredient through a brief fully occluded dark transition, then emerges below the grinder's fixed metal dispensing chute. Fresh fine brown coffee grounds fall naturally from this chute into an open realistic Vietnamese stainless steel phin placed below, not espresso equipment. Do not show internal blades, transparent machinery, floating tools or hands. Camera continues downward toward the bed of grounds; end mid-movement with grounds filling the lens as a soft dark brown texture for the next continuation. Consistent forest green coffee kiosk, warm wood, soft golden daylight and steel highlights; action right third, calm green depth left. Macro product commercial with coherent gravity, no cuts. No text, no logos, no lettering anywhere.
```

### Đoạn 3

```text
One continuous shot continuing downward from an extreme macro view of the dark brown coffee grounds inside a realistic Vietnamese stainless steel phin. A thin stream of hot water enters from a kettle spout at upper edge, kettle and operator otherwise out of frame; grounds bloom and light steam drifts. Camera follows down along the opaque exterior of the rigid stainless steel phin, its rim passing close to lens in a brief natural wipe; never make metal transparent. Arrive below the phin at a clear glass on warm wooden counter as dark coffee droplets fall into a small pool and create subtle ripples. A visually time-compressed brewing illustration, not real-time brewing. The entire phin and glass sit at right third with generous top and bottom margins, quiet shaded forest green background at left for page captions. Fixed stable geometry, no espresso machine, no hands, no transformation into kombucha. End fully at rest on the glass after a final drop, lingering tiny ripple and faint steam only. Same soft golden daylight as prior shot. No text, no logos, no lettering anywhere.
```

## 7. Band map và bản tĩnh

Điểm bắt đầu để kiểm thử: vùng hero 1000vh, ba band 0–0.33, 0.33–0.66, 0.66–1. Đoạn đầu chữ hiện sẵn; đoạn hai chữ hạ nhẹ theo bột; đoạn cuối tiêu đề, subline và CTA lần lượt đi vào trạng thái nghỉ. Điều chỉnh theo flick test 120/240/360px. Chữ nằm trong vùng trái, không che máy và phin phía phải.

Hero tĩnh: “Trạm tỉnh táo. Chạm tương lai.” Mô tả: “Một chút đậm đà của cà phê. Một chút chua thanh từ kombucha. Ghé Trạm Khởi, tìm vị của bạn.” Nút chính “Tham gia cộng đồng”, phụ “Khám phá thức uống”.

## 8. Sau hero

Giữ nội dung menu, mô tả khẩu vị, ảnh mặt trước/sau bao bì, câu chuyện FPT, thông tin kiosk phụ, FAQ và cộng đồng theo DESIGN-PROPOSAL.md. Menu chọn khẩu vị là tương tác chính giữa hành trình. Không tự tạo giá, lời chứng thực, địa chỉ hoặc lời hứa sức khỏe. QR cộng đồng cần giải mã hoặc xác nhận URL, không tự chế link. Không dựng form báo gửi thành công khi chưa có nơi nhận.

## 9. Hình vector và kỹ thuật

Vẽ SVG đường cong cánh cửa, đường dẫn giọt cà phê và đường chia section. Chuyển động nhẹ, dừng ngoài màn hình và khi tab ẩn. Giảm chuyển động hiển thị trạng thái cuối.

Theo đầy đủ scrub-pipeline.md: Blob fetch và loading ring nếu cần, lerp chuẩn hóa theo dt, seek gating tránh deadlock, DOM chỉ ghi khi đổi, bốn lớp legibility, năm static-hero gates với change listeners, website hoàn chỉnh khi không có video. Một index.html và assets/, không framework hay build step. Media gốc và bản review nằm ngoài thư mục deploy.

## 10. Các điểm duyệt

Người dùng duyệt storyboard và tổng ngân sách trước khi tạo. Duyệt ảnh đầu trước video. Duyệt riêng từng đoạn trước khi lấy frame cuối tạo đoạn sau. Kiểm tra hình dạng máy, trọng lực, phin inox, bố cục, vùng chữ và khung cuối. Báo chi phí tạo lại nếu cần, không tự reroll vượt ngân sách.

Trước preview: kiểm tra desktop/mobile, bàn phím, tương tác chọn vị, liên kết, overflow, video lỗi, reduced motion live và console. Copy trong thiết kế được dùng nguyên văn; không em dash và không từ khuôn mẫu bị cấm theo copy gate của 10k-websites.
