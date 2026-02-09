# 🛍️ LuxeMarket - Modern E-Commerce

Ứng dụng thương mại điện tử hiện đại được xây dựng với React, TypeScript và Vite.

![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)

## ✨ Tính năng

- 🏠 **Trang chủ** - Hiển thị sản phẩm nổi bật
- 📦 **Danh sách sản phẩm** - Duyệt và tìm kiếm sản phẩm
- 🔍 **Chi tiết sản phẩm** - Xem thông tin chi tiết
- 🛒 **Giỏ hàng** - Quản lý sản phẩm đã chọn
- 💳 **Thanh toán** - Quy trình checkout đơn giản
- 👤 **Tài khoản** - Đăng ký/Đăng nhập
- 👨‍💼 **Admin Panel** - Quản lý sản phẩm và đơn hàng
- 💬 **Chat Widget** - Hỗ trợ khách hàng

## 🛠️ Công nghệ sử dụng

| Frontend | Backend |
|----------|---------|
| React 19 | Express.js |
| TypeScript | Node.js |
| React Router 7 | CORS |
| Framer Motion | |
| Recharts | |
| Lucide Icons | |

## 🚀 Cài đặt và chạy

### Yêu cầu
- Node.js (v18+)
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone https://github.com/quandangiu/react-project.git

# Di chuyển vào thư mục
cd react-project

# Cài đặt dependencies
npm install
```

### Chạy ứng dụng

```bash
# Chạy frontend (development)
npm run dev

# Chạy backend server (tùy chọn)
npm run server
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

## 📁 Cấu trúc dự án

```
react-project/
├── components/          # UI Components
│   ├── chat/           # Chat widget
│   ├── common/         # Common components
│   ├── layout/         # Header, Footer
│   └── product/        # Product components
├── pages/              # Các trang
│   ├── Home.tsx
│   ├── ProductList.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Auth.tsx
│   ├── Profile.tsx
│   └── Admin.tsx
├── server/             # Backend Express server
├── store/              # State management
├── App.tsx             # Main app component
├── types.ts            # TypeScript types
└── mockData.ts         # Mock data
```

## 📜 Scripts

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy development server |
| `npm run build` | Build production |
| `npm run preview` | Preview production build |
| `npm run server` | Chạy backend server |

## 👤 Tác giả

**Quan Dang**

## 📄 License

MIT License
