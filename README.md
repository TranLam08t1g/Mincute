# Khám Phá Vũ Trụ - Nhà Thám Hiểm Nhí

Ứng dụng giáo dục tương tác dành cho thiếu nhi Việt Nam, giúp khám phá hệ Mặt Trời qua đồ họa 3D, câu đố vui và sưu tầm huy hiệu.

## Tính năng

- **Hệ Mặt Trời 3D** - Tám hành tinh với quỹ đạo, vệ tinh, texture thực tế, shader custom
- **Tương tác trực quan** - Nhấp vào hành tinh để xem thông tin, xoay camera 3D
- **Câu đố vui** - 33+ câu hỏi trắc nghiệm giúp bé học hỏi khi chơi
- **Sưu tầm huy hiệu** - Mỗi hành tinh khám phá xong sẽ được huy hiệu riêng
- **Nhân vật Min Cute** - Hướng dẫn viên phi hành gia dễ thương đồng hành cùng bé
- **Hiệu ứng đẹp mắt** - Confetti, glow, animation mượt mà

## Tech Stack

| Thư viện | Mục đích |
|---|---|
| React 19 + TypeScript 6 | UI framework |
| Vite 8 | Build tool |
| Three.js + React Three Fiber | Đồ họa 3D |
| GSAP + Motion | Animation |
| TailwindCSS v4 | Styling |
| Zustand | State management |

## Cài đặt & Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## Deploy

Web được tự động deploy lên GitHub Pages khi push lên branch `main`.

👉 **[Khám phá vũ trụ ngay](https://tranlam08t1g.github.io/Mincute)**