# Mô phỏng thuật toán phân nhóm K-Means

Trang web mô phỏng **từng bước** thuật toán K-Means, dùng trong giảng dạy Toán 11 lồng ghép AI. Mỗi bước của thuật toán được máy chạy chậm, có hiệu ứng và lời giải thích, để học sinh nhìn thấy máy "suy nghĩ" như thế nào. Trang được thiết kế cho màn hình tương tác (Smart TV cảm ứng): nút lớn, thao tác chạm đơn giản.

Không cần cài đặt, không cần máy chủ, không dùng thư viện ngoài. Chỉ gồm ba file HTML, CSS và JavaScript thuần.

```
├── index.html   khung giao diện và phần "Giải thích thuật toán"
├── style.css    giao diện, gồm 4 theme (Sáng, Tối, Liquid Glass, Material 3)
└── script.js    thuật toán, hiệu ứng, dữ liệu mẫu
```

**Chạy thử:** mở `index.html` bằng trình duyệt. **Đưa lên GitHub Pages:** đẩy cả ba file lên một repository, vào *Settings → Pages*, chọn nhánh chứa file rồi lưu.

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
| Lặp lại | Khung thông báo cho biết đang ở vòng nào. Có thể bấm **Quay lại** để xem lại bước vừa chạy. |
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

Sau khi máy chia nhóm, ta dùng các số đặc trưng đã học (số trung bình, trung vị, khoảng biến thiên, độ lệch chuẩn) để mô tả từng nhóm: nhóm nào đông, nhóm nào tập trung, nhóm nào trải rộng. Trang có nút **Lập bảng số liệu ghép nhóm** để chuyển kết quả sang bảng tần số dạng các lớp [a; b).

Khác với ghép nhóm số liệu: khi ghép nhóm, **con người** tự chia các khoảng; với K-Means, **máy tự tìm** cách chia dựa trên khoảng cách.

Câu hỏi gợi ý cho học sinh:
1. AI dựa vào tiêu chí nào để quyết định một điểm thuộc nhóm này mà không phải nhóm kia?
2. Nếu đổi K từ 2 thành 4 thì các nhóm thay đổi thế nào?
3. Biết tâm và số đặc trưng của mỗi nhóm thì người làm kinh doanh ra được quyết định gì?
4. Chạy lại nhiều lần với cùng dữ liệu và cùng K, kết quả có luôn giống nhau không? Vì sao?

---

## Tính năng của trang

### Chạy thuật toán

- Các nút **Quay lại**, **Bước tiếp**, **Chạy tự động**, **Làm lại**, **Xóa hết**, **Bỏ qua** (nhảy ngay đến kết quả của bước đang chạy).
- K chọn từ 2 đến 16.
- Chạm vào một **tâm nhóm** để mở thẻ thông tin riêng: tọa độ tâm, số trung bình, trung vị, khoảng biến thiên, độ lệch chuẩn theo từng trục. Bấm tên một số đặc trưng để xem công thức và phép tính dạng phân số. Mở được nhiều thẻ cùng lúc; thẻ kéo di chuyển và phóng to, thu nhỏ được; nút **Tắt tất cả** đóng mọi thẻ.
- Chạm vào một **điểm dữ liệu** (khi đã có tâm) để xem tọa độ, nhóm của điểm và khoảng cách đến từng tâm.
- Sau khi hội tụ, nút **Lập bảng số liệu ghép nhóm** tạo bảng lớp [a; b) và tần số, chọn biến x hoặc y, chia theo nhóm K-Means hoặc chia đều.

### Dữ liệu

- **Tự chấm điểm:** chạm vào khung trắng để thêm từng điểm, chạm lại vào điểm để xóa (khi chưa chạy thuật toán).
- **Mẫu có sẵn:** 52 mẫu thực tiễn, mỗi mẫu có tên trục và đơn vị riêng (xem danh sách bên dưới).
- **Ngẫu nhiên:** rải K cụm ngẫu nhiên theo mẫu đang chọn, hoặc theo trục tự cấu hình khi ở chế độ tự chấm điểm.
- **Cấu hình:** số điểm mỗi nhóm (tối đa khoảng 100 000 điểm), tên, đơn vị, giá trị bắt đầu, kết thúc và khoảng chia của hai trục khi tự chấm điểm.

### Cài đặt

Cỡ chữ, giao diện (Sáng, Tối, Liquid Glass, Material 3), tốc độ chạy, âm thanh, khôi phục mặc định. Cài đặt được lưu trong trình duyệt.

### Màn hình cảm ứng

Cuộn bằng cách cầm nắm (kéo ngón tay hoặc chuột, có quán tính), nút to, không có thông báo nổi bật lên khi chạm nhầm, có chế độ toàn màn hình. Nhấn phím **Esc** để đóng hộp thoại đang mở.

---

## Danh sách 52 mẫu có sẵn

Phần lớn mẫu bám theo ngữ cảnh thống kê trong sách giáo khoa và sách bài tập Toán 11. Số liệu do máy **mô phỏng**, không phải bảng số liệu gốc của sách.

| Chủ đề | Các mẫu |
|---|---|
| Cơ thể, thể thao | Cỡ áo; Cỡ giày; Tuổi và chiều cao học sinh; Xà đơn và chạy 1000 m; Chạy 100 m và nhảy xa; Buổi chạy bộ; Giải chạy marathon; Đạp xe đường dài; Vận động và uống nước; Cầu thủ ghi bàn và kiến tạo |
| Học tập | Điểm Toán và Ngữ văn; Giờ tự học và điểm trung bình; Giấc ngủ và điện thoại; Xem ti vi và học bài; Thời gian giải toán và điểm; Mượn sách thư viện; Đi học mỗi ngày; Điểm giữa kỳ và cuối kỳ; Luyện nghe và điểm IELTS; Tiền tiêu vặt |
| Nông nghiệp, chăn nuôi | Phân loại cam; Cây giống sau nảy mầm; Cây dừa giống; Ngan nuôi thịt; Bón phân và năng suất lúa; Gà nuôi theo tuần tuổi; Cá nuôi trong ao; Hộ nuôi bò sữa; Hoa sau ngày gieo trồng |
| Kinh tế, dịch vụ | Mua xăng; Khách quán trà sữa; Phòng trọ; Lái xe taxi; Công nhân và thu nhập; Bảo hiểm nhân thọ; Diện tích và giá nhà; Tuổi xe và giá xe cũ; Cửa hàng tiện lợi; Giá bán và số phần bán; Giao hàng theo quãng đường; Bán kem theo nhiệt độ |
| Đời sống, công nghệ, thời tiết | Thời tiết theo mùa; Nhiệt độ cao nhất và thấp nhất; Lượng mưa và mực nước sông; Dùng điện thoại mỗi tháng; Pin điện thoại; Hộ gia đình dùng điện; Xe qua trạm thu phí; Đọc báo điện tử; Dùng mạng xã hội; Chờ xe buýt và độ hài lòng; Bóng đèn |
