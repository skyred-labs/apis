# Simple Calculator & User Management API

API đơn giản để tính tổng 2 số và quản lý users, được deploy trên Vercel với database.

## 🚀 Cách sử dụng

### 1. Calculator API

#### Endpoint
```
POST /api/add
```

#### Request Body
```json
{
  "a": 5,
  "b": 3
}
```

#### Response
```json
{
  "success": true,
  "result": {
    "a": 5,
    "b": 3,
    "sum": 8
  },
  "message": "Tổng của 5 và 3 là 8"
}
```

### 2. User Management API

#### Add User
```
POST /api/users-add
```

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User đã được thêm thành công!",
  "user": {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "created_at": "2025-09-21T16:00:00.000Z"
  }
}
```

#### Get Users List
```
GET /api/users-list?page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "message": "Lấy danh sách users thành công!",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "Nguyễn Văn A",
        "email": "user@example.com",
        "created_at": "2025-09-21T16:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalUsers": 1,
      "limit": 10,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

### 3. Static Files

#### View Images
```
https://apis-smoky-nine.vercel.app/anh1.png
https://apis-smoky-nine.vercel.app/question1.png
```

## 🧪 Test API

### Sử dụng curl

**Calculator:**
```bash
curl -X POST https://apis-smoky-nine.vercel.app/api/add \
  -H "Content-Type: application/json" \
  -d '{"a": 10, "b": 20}'
```

**Add User:**
```bash
curl -X POST https://apis-smoky-nine.vercel.app/api/users-add \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com"}'
```

**Get Users:**
```bash
curl https://apis-smoky-nine.vercel.app/api/users-list
```

### Sử dụng JavaScript (fetch)

```javascript
// Add user
const response = await fetch('https://apis-smoky-nine.vercel.app/api/users-add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com'
  })
});

const result = await response.json();
console.log(result);
```

## 🗄️ Database Setup

### Vercel Postgres
1. **Vào Vercel Dashboard** → Project của bạn
2. **Storage** → **Create Database** → **Postgres**
3. **Copy connection string** và thêm vào Environment Variables
4. **Redeploy** project

### Environment Variables cần thiết:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## 📁 Cấu trúc project

```
apis/
├── api/
│   ├── add.js              # Calculator API
│   ├── test.js             # Test API
│   ├── users-add.js        # Add user API
│   ├── users-list.js       # Get users list API
│   └── users-test.js       # Users test API
├── public/
│   ├── anh1.png           # Static image
│   └── question1.png      # Static image
├── package.json           # Dependencies
├── vercel.json           # Vercel configuration
└── README.md             # Documentation
```

## 🚀 Deploy lên Vercel

1. **Push code lên GitHub**
2. **Connect Vercel với GitHub repository**
3. **Setup Vercel Postgres database**
4. **Add Environment Variables**
5. **Deploy!**

## ✨ Tính năng

- ✅ **Calculator API** - Tính tổng 2 số
- ✅ **User Management** - Thêm và lấy danh sách users
- ✅ **Database Integration** - Vercel Postgres
- ✅ **Static File Serving** - Serve ảnh từ public/
- ✅ **Pagination** - Phân trang cho danh sách users
- ✅ **Error Handling** - Xử lý lỗi chi tiết
- ✅ **Input Validation** - Kiểm tra dữ liệu đầu vào

## 🔧 Lưu ý

- API chỉ chấp nhận method được chỉ định
- Email phải unique (không trùng lặp)
- Pagination: page >= 1, limit từ 1-100
- Database sẽ tự động tạo bảng khi cần