import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Chỉ cho phép method GET
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed. Chỉ hỗ trợ GET method.' 
    });
  }

  try {
    const { page = 1, limit = 10 } = req.query;
    
    // Chuyển đổi page và limit sang số
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    // Kiểm tra tính hợp lệ của page và limit
    if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({
        error: 'Tham số không hợp lệ.',
        message: 'page phải >= 1, limit phải từ 1-100',
        example: '/api/users/list?page=1&limit=10'
      });
    }

    // Tính offset cho pagination
    const offset = (pageNum - 1) * limitNum;

    // Tạo bảng users nếu chưa tồn tại
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Lấy tổng số users
    const countResult = await sql`SELECT COUNT(*) as total FROM users;`;
    const totalUsers = parseInt(countResult.rows[0].total);

    // Lấy danh sách users với pagination
    const usersResult = await sql`
      SELECT id, name, email, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT ${limitNum}
      OFFSET ${offset};
    `;

    const users = usersResult.rows;

    // Tính thông tin pagination
    const totalPages = Math.ceil(totalUsers / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    // Trả về kết quả
    res.status(200).json({
      success: true,
      message: 'Lấy danh sách users thành công!',
      data: {
        users: users,
        pagination: {
          currentPage: pageNum,
          totalPages: totalPages,
          totalUsers: totalUsers,
          limit: limitNum,
          hasNextPage: hasNextPage,
          hasPrevPage: hasPrevPage
        }
      }
    });

  } catch (error) {
    console.error('Lỗi xử lý request:', error);
    res.status(500).json({
      error: 'Lỗi server nội bộ',
      message: 'Có lỗi xảy ra khi xử lý request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
