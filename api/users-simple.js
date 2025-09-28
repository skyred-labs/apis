export default function handler(req, res) {
  if (req.method === 'POST') {
    // Simulate adding user (without database)
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        error: 'Thiếu tham số. Vui lòng gửi cả name và email.',
        example: {
          name: 'Nguyễn Văn A',
          email: 'user@example.com'
        }
      });
    }

    // Simulate response
    res.status(201).json({
      success: true,
      message: 'User đã được thêm thành công! (Simulation)',
      user: {
        id: Math.floor(Math.random() * 1000),
        name: name,
        email: email,
        created_at: new Date().toISOString()
      },
      note: 'Đây là simulation, không lưu vào database thật'
    });
  } else if (req.method === 'GET') {
    // Simulate getting users list
    res.status(200).json({
      success: true,
      message: 'Lấy danh sách users thành công! (Simulation)',
      data: {
        users: [
          {
            id: 1,
            name: 'User 1',
            email: 'user1@example.com',
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            name: 'User 2',
            email: 'user2@example.com',
            created_at: new Date().toISOString()
          }
        ],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalUsers: 2,
          limit: 10,
          hasNextPage: false,
          hasPrevPage: false
        }
      },
      note: 'Đây là simulation, không lấy từ database thật'
    });
  } else {
    res.status(405).json({
      error: 'Method not allowed. Chỉ hỗ trợ GET và POST method.'
    });
  }
}

