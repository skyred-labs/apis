export default function handler(req, res) {
  res.status(200).json({
    message: 'Test API hoạt động!',
    method: req.method,
    timestamp: new Date().toISOString()
  });
}
