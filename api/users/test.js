export default function handler(req, res) {
  res.status(200).json({
    message: 'Users API test hoạt động!',
    method: req.method,
    timestamp: new Date().toISOString(),
    path: '/api/users/test'
  });
}
