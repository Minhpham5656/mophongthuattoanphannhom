# Mô phỏng thuật toán phân nhóm K-Means

Trang web mô phỏng **từng bước** thuật toán K-Means, dùng trong giảng dạy Toán 11 lồng ghép AI. Mỗi bước của thuật toán được máy chạy chậm, có hiệu ứng và lời giải thích, để học sinh nhìn thấy máy "suy nghĩ" như thế nào. Trang được thiết kế cho màn hình tương tác (Smart TV cảm ứng): nút lớn, thao tác chạm đơn giản.

Không cần cài đặt, không cần máy chủ, không dùng thư viện ngoài. Chỉ gồm ba file HTML, CSS và JavaScript thuần.

---

## 1. K-Means dùng để làm gì?

Có một đám dữ liệu lộn xộn và ta muốn **chia thành K nhóm**, mỗi nhóm gồm những đối tượng giống nhau. Ví dụ: công ty may có số đo của rất nhiều học sinh và muốn chia thành các cỡ áo S, M, L. Không ai chia bằng tay, máy tự làm bằng K-Means.

- **K** là số nhóm do con người chọn trước.
- Đây là một thuật toán **học không giám sát**: dữ liệu không có nhãn sẵn, máy tự tìm cách chia.

## 2. Biến dữ liệu thành điểm trên mặt phẳng

Mỗi đối tượng có hai số, ví dụ (chiều cao; cân nặng) của một học sinh. Cặp số đó là tọa độ của một điểm. Hai bạn có số đo giống nhau thì hai điểm nằm gần nhau. Vì vậy trong K-Means, **"giống nhau" được hiểu là "gần nhau"**.

## 3. Hai công cụ Toán được dùng

**Khoảng cách** giữa A(x₁; y₁) và B(x₂; y₂):

```
d = √[(x₂ − x₁)² + (y₂ − y₁)²]
```

Dùng để biết điểm nào **gần tâm nào hơn**.

**Trung bình cộng:**

```
x̄ = (x₁ + x₂ + … + xₙ) : n
```

Tâm của một nhóm có hoành độ bằng trung bình các hoành độ, tung độ bằng trung bình các tung độ.

## 4. Thuật toán gồm 3 bước, lặp lại nhiều vòng

| Bước | Tên | Việc máy làm |
|---|---|---|
| 1 | Chọn tâm | Chọn **ngẫu nhiên** K điểm làm "tâm nhóm" ban đầu (máy chưa biết nhóm nằm ở đâu nên chọn đại). |
| 2 | Gán nhóm | Mỗi điểm đo khoảng cách đến K tâm, chọn tâm **gần nhất** và nhận màu của tâm đó. |
| 3 | Dời tâm | Mỗi tâm dời về vị trí **trung bình cộng** tọa độ các điểm cùng màu với nó. |

Sau bước 3, quay lại bước 2 (vì tâm đã đổi chỗ nên có điểm sẽ đổi nhóm). Lặp đến khi **tâm không dịch chuyển nữa**: thuật toán **hội tụ** và việc chia nhóm ổn định.

Giả mã:

```
chọn ngẫu nhiên K điểm làm tâm c₁, c₂, …, c_K
lặp:
    với mỗi điểm p:
        nhóm(p) = chỉ số j sao cho khoảng cách(p, c_j) nhỏ nhất
    với mỗi nhóm j:
        c_j = trung bình cộng tọa độ các điểm có nhóm(p) = j
    nếu không tâm nào dịch chuyển: dừng
```

## 5. Ví dụ tính tay

Cho 4 điểm A(1; 1), B(2; 1), C(8; 8), D(9; 9). Chọn K = 2, lấy A và C làm tâm ban đầu.

**Chọn tâm gần nhất:**
- B cách A là 1, cách C là √85 ≈ 9,2, nên B về nhóm của A.
- D cách C là √2 ≈ 1,4, cách A là √128 ≈ 11,3, nên D về nhóm của C.
- Được hai nhóm {A, B} và {C, D}.

**Dời tâm:**
- Tâm nhóm 1 = ((1 + 2) : 2; (1 + 1) : 2) = (1,5; 1).
- Tâm nhóm 2 = ((8 + 9) : 2; (8 + 9) : 2) = (8,5; 8,5).

**Lặp lại:** tính lại khoảng cách thì không điểm nào đổi nhóm, tâm không đổi nữa, nên dừng.

## 6. Vì sao thuật toán luôn dừng?

- Ở bước 2, mỗi điểm chuyển sang tâm gần nó nhất, nên tổng bình phương khoảng cách từ các điểm đến tâm của nhóm mình **không thể tăng**.
- Ở bước 3, trung bình cộng là vị trí làm tổng bình phương khoảng cách đến các điểm trong nhóm **nhỏ nhất**, nên tổng này cũng **không thể tăng**.
- Số cách chia nhóm là hữu hạn, và tổng này không tăng sau mỗi vòng, nên sau một số vòng hữu hạn thì không còn gì thay đổi.

## 7. Trang mô phỏng thể hiện thuật toán như thế nào

| Bước thuật toán | Trên màn hình |
|---|---|
| Bước 1: chọn tâm | Đèn chiếu quét qua các điểm rồi dừng ở điểm được chọn. Điểm đó trở thành ô vuông lớn có vòng tròn quay quanh, kèm nhãn "Tâm n". |
| Bước 2: gán nhóm | Từng điểm được nối bằng một đường tới tâm gần nhất và đổi sang màu của tâm đó. |
| Bước 3: dời tâm | Mỗi tâm trượt từ vị trí cũ sang vị trí trung bình mới, có đường nét đứt đánh dấu quãng đã dời. |
| Lặp lại | Thanh thông báo đếm số vòng. Có thể bấm **Quay lại** để xem lại bước vừa chạy. |
| Hội tụ | Khi tâm không dịch chuyển nữa, trang báo "Xong! Thuật toán đã hội tụ" kèm số vòng đã chạy. |

Một vài chi tiết hay hỏi:

- Trang tính khoảng cách trên **tọa độ đã quy về thang 0 đến 1** theo khoảng giá trị của từng trục. Nhờ đó hai đại lượng khác đơn vị (ví dụ lít và số lần đổ xăng) được coi ngang nhau, không đại lượng nào "lấn át" đại lượng kia.
- Nếu một điểm cách đều hai tâm, điểm sẽ về tâm có số thứ tự nhỏ hơn.
- Nếu một nhóm không có điểm nào, tâm của nhóm đó đứng yên tại chỗ.
- Thuật toán dừng khi mọi tâm dịch chuyển rất ít (dưới 0,000001 trên thang 0 đến 1).

## 8. Hạn chế và lưu ý

- **K do con người chọn.** Chọn K quá nhỏ thì các nhóm bị gộp lẫn, chọn K quá lớn thì chia vụn. Có thể đổi K từ 2 đến 16 để so sánh.
- **Tâm ban đầu chọn ngẫu nhiên**, nên mỗi lần chạy có thể cho kết quả hơi khác nhau. Thuật toán dừng ở một cách chia ổn định nhưng chưa chắc là cách chia tốt nhất. Bấm **Làm lại** vài lần để thấy điều này.
- **Điểm ngoại lai** (rất xa các điểm khác) kéo tâm lệch đi vì trung bình cộng nhạy với giá trị lớn bất thường.
- **Hình dạng nhóm:** K-Means chia tốt khi các nhóm gọn, tròn và có kích thước tương đương; kém hơn khi nhóm có hình dạng dài, cong hoặc lồng nhau.

## 9. Liên hệ với Toán 11

Sau khi máy chia nhóm, ta dùng các số đặc trưng đã học (số trung bình, trung vị, khoảng biến thiên, độ lệch chuẩn) để mô tả từng nhóm: nhóm nào đông, nhóm nào tập trung, nhóm nào trải rộng. Trang có nút **Lập bảng số liệu ghép nhóm** để chuyển kết quả sang bảng tần số.

Khác với ghép nhóm số liệu: khi ghép nhóm, **con người** tự chia các khoảng; với K-Means, **máy tự tìm** cách chia dựa trên khoảng cách.

Câu hỏi gợi ý cho học sinh:
1. AI dựa vào tiêu chí nào để quyết định một điểm thuộc nhóm này mà không phải nhóm kia?
2. Nếu đổi K từ 2 thành 4 thì các nhóm thay đổi thế nào?
3. Biết tâm và số đặc trưng của mỗi nhóm thì người làm kinh doanh ra được quyết định gì?
4. Chạy lại nhiều lần với cùng dữ liệu và cùng K, kết quả có luôn giống nhau không? Vì sao?

---

## Tính năng của trang

**Chạy thuật toán:** các nút Quay lại, Bước tiếp, Chạy tự động, Làm lại, Xóa hết, Bỏ qua. K chọn từ 2 đến 16. Mỗi tâm có thẻ thông tin riêng, kéo di chuyển và phóng to, thu nhỏ được.

**Dữ liệu:**
- **Tự chấm điểm:** chạm vào khung trắng để thêm từng điểm.
- **Mẫu có sẵn:** 14 mẫu thực tiễn: Cỡ áo, Mua xăng, Cỡ giày, Điểm Toán và Ngữ văn, Giờ tự học và điểm trung bình, Khách quán trà sữa, Thời tiết theo mùa, Buổi chạy bộ, Dùng điện thoại mỗi tháng, Hộ gia đình dùng điện, Phân loại cam, Đi học mỗi ngày, Giấc ngủ và điện thoại, Phòng trọ.
- **Ngẫu nhiên:** rải K cụm ngẫu nhiên theo mẫu đang chọn, hoặc theo trục tự cấu hình khi ở chế độ tự chấm điểm.
- **Cấu hình:** số điểm mỗi nhóm (tối đa khoảng 100 000 điểm), tên, đơn vị và khoảng giá trị của hai trục khi tự chấm điểm.

**Cài đặt:** cỡ chữ, tốc độ chạy, âm thanh, và giao diện (Sáng, Tối, Liquid Glass, Material 3). Cài đặt được lưu trong trình duyệt.

**Màn hình cảm ứng:** cuộn bằng cách cầm nắm (kéo ngón tay hoặc chuột, có quán tính), nút to, có chế độ toàn màn hình.

## Cách sử dụng

### Chạy trực tiếp trên máy
Tải mã nguồn về và mở file `index.html` bằng trình duyệt (Chrome, Edge hoặc Cốc Cốc bản mới).

### Đăng lên GitHub Pages
1. Tạo repository mới trên GitHub.
2. Tải ba file `index.html`, `style.css`, `script.js` lên **thư mục gốc** (GitHub không tự giải nén file zip, cần giải nén trước).
3. Vào **Settings, Pages**, ở mục **Branch** chọn nhánh `main` và thư mục `/ (root)`, bấm **Save**.
4. Chờ khoảng một phút rồi mở `https://<tên-tài-khoản>.github.io/<tên-repository>/`.

> **Lưu ý khi cập nhật:** trình duyệt có thể giữ bản cũ của `script.js` hoặc `style.css`. Nếu thấy lỗi hoặc thiếu tính năng sau khi cập nhật, hãy nhấn **Ctrl + F5**. Cần thay đủ cả ba file mỗi lần cập nhật.

## Cấu trúc thư mục

```
.
├── index.html   Giao diện, hộp thoại và phần giải thích thuật toán
├── style.css    Kiểu hiển thị và bốn theme
├── script.js    Thuật toán, dữ liệu mẫu, điều khiển và vẽ biểu đồ
└── README.md
```

## Ghi chú kỹ thuật

- Biểu đồ vẽ bằng Canvas. Khi có trên 3 000 điểm, chương trình vẽ gộp để vẫn mượt, và chỉ vẽ lại khi có thay đổi.
- Theme Liquid Glass dùng `backdrop-filter`, nặng hơn các theme khác. Nếu máy yếu bị chậm, hãy chuyển sang theme Sáng hoặc Material 3.
- Âm thanh dùng Web Audio API, tạo trực tiếp trong trình duyệt, không cần file âm thanh.
