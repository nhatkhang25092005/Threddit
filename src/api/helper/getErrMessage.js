export const getErrMessage = (code) => {
  switch (code) {
    // Network errors
    case 'ECONNABORTED':
      return 'Máy chủ đang gặp trục trặc. Xin lỗi vì sự bất tiện này, chúng tôi đang cố gắng khắc phục.';
    
    case 'ERR_NETWORK':
    case 'ENETUNREACH':
    case 'ENOTFOUND':
      return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.';
    
    case 'ETIMEDOUT':
      return 'Kết nối bị timeout. Vui lòng thử lại.';
    
    case 'ECONNREFUSED':
      return 'Máy chủ từ chối kết nối. Vui lòng thử lại sau.';
    
    case 'ECONNRESET':
      return 'Kết nối bị ngắt đột ngột. Vui lòng thử lại.';
    
    // Axios specific errors
    case 'ERR_BAD_REQUEST':
      return 'Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin.';
    
    case 'ERR_BAD_RESPONSE':
      return 'Máy chủ trả về phản hồi không hợp lệ.';
    
    case 'ERR_CANCELED':
      return 'Yêu cầu đã bị hủy.';
    
    case 'ERR_INVALID_URL': return 'Đường dẫn không hợp lệ.';
    
    // HTTP Status codes
    case 400: return 'Dữ liệu không hợp lệ.';
    
    case 401: return 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.';
    
    case 403: return 'Bạn không có quyền truy cập.';
    
    case 404:
      return 'Không tìm thấy dữ liệu yêu cầu.';
    
    case 408:
      return 'Yêu cầu bị timeout. Vui lòng thử lại.';
    
    case 429:
      return 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.';
    
    case 500: return 'Lỗi máy chủ. Vui lòng thử lại sau.';
    
    case 502:
    case 503: return 'Máy chủ đang bảo trì. Vui lòng thử lại sau.';
    
    case 504: return 'Máy chủ không phản hồi. Vui lòng thử lại sau.';
    
    default: return 'Có lỗi xảy ra. Vui lòng thử lại.';
  }
}