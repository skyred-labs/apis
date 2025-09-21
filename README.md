# Simple Calculator API

API đơn giản để tính tổng 2 số nguyên, được deploy trên Vercel.

## Cách sử dụng

### Endpoint
```
POST /api/add
```

### Request Body
```json
{
  "a": 5,
  "b": 3
}
```

### Response thành công
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

### Response lỗi
```json
{
  "error": "Thiếu tham số. Vui lòng gửi cả 2 số a và b.",
  "example": {
    "a": 5,
    "b": 3
  }
}
```

## Test API

### Sử dụng curl
```bash
curl -X POST https://your-app.vercel.app/api/add \
  -H "Content-Type: application/json" \
  -d '{"a": 10, "b": 20}'
```

### Sử dụng JavaScript (fetch)
```javascript
const response = await fetch('https://your-app.vercel.app/api/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    a: 10,
    b: 20
  })
});

const result = await response.json();
console.log(result);
```

## Deploy lên Vercel

1. Cài đặt Vercel CLI:
```bash
npm i -g vercel
```

2. Login vào Vercel:
```bash
vercel login
```

3. Deploy project:
```bash
vercel
```

4. Hoặc deploy production:
```bash
vercel --prod
```

## Cấu trúc project

```
apis/
├── api/
│   └── add.js          # API endpoint chính
├── package.json        # Dependencies và scripts
├── vercel.json         # Cấu hình Vercel
└── README.md          # Hướng dẫn sử dụng
```

## Lưu ý

- API chỉ chấp nhận method POST
- Cả 2 tham số `a` và `b` phải là số nguyên
- API sẽ trả về lỗi nếu thiếu tham số hoặc tham số không hợp lệ
test apis
