# 🌊 Frontend Flood & Traffic AI Monitor (Vercel)

Ứng dụng Web Giám Sát Đo Độ Sâu Nước Ngập Đô Thị & Ùn Tắc Giao Thông Thời Gian Thực sử dụng Deep Learning (YOLOv8s-seg + YOLOv8s + ByteTrack + SCSG-Net).

- **Frontend**: Triển khai trên **Vercel** (HTML5, TailwindCSS, ES6 Vanilla - tốc độ cao, zero configuration).
- **Backend Model**: Chạy trên **Kaggle GPU** (FastAPI) thông qua **Ngrok Tunnel**.

---

## 🚀 Triển Khai Lên Vercel (1 Phút)

### Cách 1: Import trực tiếp từ GitHub (Khuyên dùng)
1. Đăng nhập [Vercel](https://vercel.com) bằng tài khoản GitHub của bạn.
2. Bấm nút **Add New...** -> **Project**.
3. Chọn repository `Luan2004/FontendFlood`.
4. Giữ nguyên cấu hình mặc định (Framework Preset: *Other*).
5. Bấm **Deploy**.
6. Vercel sẽ tự động cấp phát domain miễn phí: `https://fontend-flood.vercel.app`.

### Cách 2: Deploy qua CLI
```bash
npx vercel
```

---

## 🔗 Kết Nối Với Backend Kaggle (Ngrok)

1. Mở Notebook trên Kaggle: [nguynvlun/floodkaggleapi](https://www.kaggle.com/code/nguynvlun/floodkaggleapi) và bấm **Run All**.
2. Tìm dòng in kết quả ở Cell cuối cùng:
   ```text
   🚀 NGROK PUBLIC API URL: https://xxxx-xx-xx.ngrok-free.app
   ```
3. Mở trang Web Vercel của bạn, bấm vào nút **Cấu hình Ngrok** (góc trên bên phải) và dán URL vào.
4. Bấm **Kiểm tra kết nối** -> **Lưu và Áp dụng**. Hệ thống sẽ chuyển sang trạng thái `🟢 Kaggle GPU Online` và bạn có thể tải ảnh lên để nhận diện tức thì!
