import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Chỉ cho phép method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed. Chỉ hỗ trợ POST method.' 
    });
  }

  try {
    const { name, email } = req.body;

    // Kiểm tra xem có đủ tham số không
    if (!name || !email) {
      return res.status(400).json({
        error: 'Thiếu tham số. Vui lòng gửi cả name và email.',
        example: {
          name: 'Nguyễn Văn A',
          email: 'user@example.com'
        }
      });
    }

    // Kiểm tra email format đơn giản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email không hợp lệ.',
        received: email
      });
    }

    // Tạo bảng users nếu chưa tồn tại
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Thêm user vào database
    const result = await sql`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
      RETURNING id, name, email, created_at;
    `;

    const newUser = result.rows[0];

    // Trả về kết quả
    res.status(201).json({
      success: true,
      message: 'User đã được thêm thành công!',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        created_at: newUser.created_at
      }
    });

  } catch (error) {
    console.error('Lỗi xử lý request:', error);

    // Kiểm tra lỗi duplicate email
    if (error.code === '23505') {
      return res.status(409).json({
        error: 'Email đã tồn tại.',
        message: 'Vui lòng sử dụng email khác.'
      });
    }

    res.status(500).json({
      error: 'Lỗi server nội bộ',
      message: 'Có lỗi xảy ra khi xử lý request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
