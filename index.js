export default function handler(req, res) {
  res.status(200).json({
    message: 'API Calculator đang hoạt động!',
    endpoints: {
      'POST /api/add': 'Tính tổng 2 số nguyên'
    },
    example: {
      url: '/api/add',
      method: 'POST',
      body: { a: 5, b: 3 }
    }
  });
}
