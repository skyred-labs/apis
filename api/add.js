export default function handler(req, res) {
  // Chỉ cho phép method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed. Chỉ hỗ trợ POST method.' 
    });
  }

  try {
    const { a, b } = req.body;

    // Kiểm tra xem có đủ 2 tham số không
    if (a === undefined || b === undefined) {
      return res.status(400).json({
        error: 'Thiếu tham số. Vui lòng gửi cả 2 số a và b.',
        example: {
          a: 5,
          b: 3
        }
      });
    }

    // Kiểm tra xem có phải số nguyên không
    if (!Number.isInteger(Number(a)) || !Number.isInteger(Number(b))) {
      return res.status(400).json({
        error: 'Cả 2 tham số phải là số nguyên.',
        received: { a, b }
      });
    }

    // Chuyển đổi sang số và tính tổng
    const numA = parseInt(a);
    const numB = parseInt(b);
    const sum = numA + numB;

    // Trả về kết quả
    res.status(200).json({
      success: true,
      result: {
        a: numA,
        b: numB,
        sum: sum
      },
      message: `Tổng của ${numA} và ${numB} là ${sum}`
    });

  } catch (error) {
    console.error('Lỗi xử lý request:', error);
    res.status(500).json({
      error: 'Lỗi server nội bộ',
      message: 'Có lỗi xảy ra khi xử lý request'
    });
  }
}
